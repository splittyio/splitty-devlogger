"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remoteLogger = void 0;
class RemoteLogger {
    constructor(endpoint, batchSize = 10, batchInterval = 5000, maxRetries = 3) {
        this.logQueue = [];
        this.timer = null;
        this.endpoint = endpoint;
        this.maxRetries = maxRetries;
        this.batchSize = batchSize;
        this.batchInterval = batchInterval;
        this.startBatching();
    }
    sendBatch() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.logQueue.length === 0)
                return;
            const logsToSend = this.logQueue.splice(0, this.batchSize);
            try {
                const response = yield fetch(this.endpoint, {
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
            }
            catch (error) {
                console.error('Failed to send batch logs:', error);
                this.logQueue.unshift(...logsToSend); // Re-add failed logs to the queue
            }
        });
    }
    enqueueLog(level, message) {
        this.logQueue.push({ level, message });
        if (this.logQueue.length >= this.batchSize) {
            this.sendBatch();
        }
    }
    startBatching() {
        if (this.timer)
            return;
        this.timer = setInterval(() => {
            this.sendBatch();
        }, this.batchInterval);
    }
    stopBatching() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }
    log(...params) {
        console.log(...params);
        this.enqueueLog('log', params);
    }
    warn(...params) {
        console.warn(...params);
        this.enqueueLog('warn', params);
    }
    info(...params) {
        console.info(...params);
        this.enqueueLog('info', params);
    }
    error(...params) {
        console.error(...params);
        this.enqueueLog('error', params);
    }
}
exports.remoteLogger = new RemoteLogger('https://my.marriage365.com/api/logging');
