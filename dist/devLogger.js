"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.devLogger = void 0;
class DevLogger {
    log(...params) {
        console.log(...params);
    }
    warn(...params) {
        console.warn(...params);
    }
    info(...params) {
        console.info(...params);
    }
    error(...params) {
        console.error(...params);
    }
}
exports.devLogger = new DevLogger();
