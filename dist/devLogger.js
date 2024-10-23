"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevLogger = void 0;
class DevLogger {
    constructor() {
        // Check if the environment is production
        this.isProduction = process.env.NODE_ENV === 'production';
    }
    log(...params) {
        if (!this.isProduction) {
            console.log(...params);
        }
    }
    warn(...params) {
        if (!this.isProduction) {
            console.warn(...params);
        }
    }
    info(...params) {
        if (!this.isProduction) {
            console.info(...params);
        }
    }
    error(...params) {
        if (!this.isProduction) {
            console.error(...params);
        }
    }
}
exports.DevLogger = DevLogger;
