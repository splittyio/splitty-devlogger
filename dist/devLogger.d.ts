import { ILogger } from './interfaces/ILogger';
declare class DevLogger implements ILogger {
    log(...params: any[]): void;
    warn(...params: any[]): void;
    info(...params: any[]): void;
    error(...params: any[]): void;
}
export declare const devLogger: DevLogger;
export {};
