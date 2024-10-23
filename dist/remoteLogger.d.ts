import { ILogger } from './interfaces/ILogger';
export declare class RemoteLogger implements ILogger {
    private endpoint;
    private isProduction;
    private maxRetries;
    private logQueue;
    private batchSize;
    private batchInterval;
    private timer;
    constructor(endpoint?: string, batchSize?: number, batchInterval?: number, maxRetries?: number);
    private sendBatch;
    private enqueueLog;
    private startBatching;
    private stopBatching;
    log(...params: any[]): void;
    warn(...params: any[]): void;
    info(...params: any[]): void;
    error(...params: any[]): void;
}
