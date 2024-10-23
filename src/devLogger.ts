import { ILogger } from './interfaces/ILogger';

export class DevLogger implements ILogger {
    private isProduction: boolean;

    constructor() {
        // Check if the environment is production
        this.isProduction = process.env.NODE_ENV === 'production';
    }


    log(...params: any[]): void {
        if (!this.isProduction) {
            console.log(...params);
        }
    }

    warn(...params: any[]): void {
        if (!this.isProduction) {
            console.warn(...params);
        }
    }

    info(...params: any[]): void {
        if (!this.isProduction) {
            console.info(...params);
        }
    }

    error(...params: any[]): void {
        if (!this.isProduction) {
            console.error(...params);
        }
    }
}
