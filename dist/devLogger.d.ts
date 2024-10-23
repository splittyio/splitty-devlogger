import { ILogger } from './interfaces/ILogger';
export declare class DevLogger implements ILogger {
    private isProduction;
    constructor();
    log(...params: any[]): void;
    warn(...params: any[]): void;
    info(...params: any[]): void;
    error(...params: any[]): void;
}
