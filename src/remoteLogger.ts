import process from 'process';
import {ILogger} from './interfaces/ILogger';

export class RemoteLogger implements ILogger {
    private endpoint: string;
    private isProduction: boolean;
    private maxRetries: number;
    private logQueue: Array<{ level: string, message: any[] }> = [];
    private batchSize: number;
    private batchInterval: number;  // in milliseconds
    private timer: ReturnType<typeof setInterval> | null = null;


    constructor(endpoint: string, batchSize = 10, batchInterval = 5000, maxRetries = 3) {
        // Use environment variable if no endpoint is provided
        this.endpoint = endpoint;
        this.isProduction = process.env.NODE_ENV === 'production';
        this.maxRetries = maxRetries;
        this.batchSize = batchSize;
        this.batchInterval = batchInterval;
        this.startBatching();
    }

    private async sendBatch(retries: number = 0): Promise<void> {
        if (this.logQueue.length === 0) return;

        const logsToSend = this.logQueue.splice(0, this.batchSize);
        try {
            const response = await fetch(this.endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    logs: logsToSend,
                    timestamp: new Date().toISOString(),
                }),
            });

            if (!response.ok) {
                throw new Error(`Server responded with status: ${response.status}`);
            }
        } catch (error) {
            if (retries < this.maxRetries) {
                console.warn(`Retrying to send logs (${retries + 1}/${this.maxRetries})...`);
                // Retry after a short delay
                setTimeout(() => this.sendBatch(retries + 1), 1000);
            } else {
                console.error('Failed to send logs after retries:', error);
                this.logQueue.unshift(...logsToSend); // Re-add failed logs to the queue
            }
        }
    }

    private enqueueLog(level: string, message: any[]): void {
        this.logQueue.push({level, message});

        if (this.logQueue.length >= this.batchSize) {
            this.sendBatch();
        }
    }

    private startBatching(): void {
        if (this.timer) return;

        // Start the interval timer
        this.timer = setInterval(() => {
            this.sendBatch();
        }, this.batchInterval);
    }

    private stopBatching(): void {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    log(...params: any[]): void {
        if (!this.isProduction) {
            console.log(...params);
        }
        this.enqueueLog('log', params);
    }

    warn(...params: any[]): void {
        if (!this.isProduction) {
            console.warn(...params);
        }
        this.enqueueLog('warn', params);
    }

    info(...params: any[]): void {
        if (!this.isProduction) {
            console.info(...params);
        }
        this.enqueueLog('info', params);
    }

    error(...params: any[]): void {
        if (!this.isProduction) {
            console.error(...params);
        }
        this.enqueueLog('error', params);
    }
}


