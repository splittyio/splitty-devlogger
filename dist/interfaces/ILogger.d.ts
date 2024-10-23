export interface ILogger {
    log(...params: any[]): void;
    warn(...params: any[]): void;
    info(...params: any[]): void;
    error(...params: any[]): void;
}
