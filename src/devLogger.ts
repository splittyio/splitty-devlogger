import { ILogger } from './interfaces/ILogger';

class DevLogger implements ILogger {

    log(...params: any[]): void {
        console.log(...params);
    }

    warn(...params: any[]): void {
        console.warn(...params);
    }

    info(...params: any[]): void {
        console.info(...params);
    }

    error(...params: any[]): void {
        console.error(...params);
    }
}

export const devLogger = new DevLogger();
