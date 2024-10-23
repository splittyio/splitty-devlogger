import { ILogger } from './interfaces/ILogger';

class RemoteLogger implements ILogger {
    private endpoint: string;
    private maxRetries: number;
    private logQueue: Array<{ level: string, message: any[] }> = [];
    private batchSize: number;
    private batchInterval: number;  // in milliseconds
    private timer: number | null = null;

    constructor(endpoint: string, batchSize = 10, batchInterval = 5000, maxRetries = 3) {
        this.endpoint = endpoint;
        this.maxRetries = maxRetries;
        this.batchSize = batchSize;
        this.batchInterval = batchInterval;
        this.startBatching();
    }

    private async sendBatch(): Promise<void> {
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
            console.error('Failed to send batch logs:', error);
            this.logQueue.unshift(...logsToSend);  // Re-add failed logs to the queue
        }
    }

    private enqueueLog(level: string, message: any[]): void {
        this.logQueue.push({ level, message });

        if (this.logQueue.length >= this.batchSize) {
            this.sendBatch();
        }
    }

    private startBatching(): void {
        if (this.timer) return;

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
        console.log(...params);
        this.enqueueLog('log', params);
    }

    warn(...params: any[]): void {
        console.warn(...params);
        this.enqueueLog('warn', params);
    }

    info(...params: any[]): void {
        console.info(...params);
        this.enqueueLog('info', params);
    }

    error(...params: any[]): void {
        console.error(...params);
        this.enqueueLog('error', params);
    }
}

export const remoteLogger = new RemoteLogger('https://my.marriage365.com/api/logging');
