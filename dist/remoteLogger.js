"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoteLogger = void 0;
const process_1 = __importDefault(require("process"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
class RemoteLogger {
    constructor(endpoint, batchSize = 10, batchInterval = 5000, maxRetries = 3) {
        this.logQueue = [];
        this.timer = null;
        // Use environment variable if no endpoint is provided
        this.endpoint = endpoint || process_1.default.env.LOGGING_ENDPOINT || '';
        this.isProduction = process_1.default.env.NODE_ENV === 'production';
        this.maxRetries = maxRetries;
        this.batchSize = batchSize;
        this.batchInterval = batchInterval;
        this.startBatching();
    }
    sendBatch() {
        return __awaiter(this, arguments, void 0, function* (retries = 0) {
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
                if (retries < this.maxRetries) {
                    console.warn(`Retrying to send logs (${retries + 1}/${this.maxRetries})...`);
                    // Retry after a short delay
                    setTimeout(() => this.sendBatch(retries + 1), 1000);
                }
                else {
                    console.error('Failed to send logs after retries:', error);
                    this.logQueue.unshift(...logsToSend); // Re-add failed logs to the queue
                }
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
        // Start the interval timer
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
        if (!this.isProduction) {
            console.log(...params);
        }
        this.enqueueLog('log', params);
    }
    warn(...params) {
        if (!this.isProduction) {
            console.warn(...params);
        }
        this.enqueueLog('warn', params);
    }
    info(...params) {
        if (!this.isProduction) {
            console.info(...params);
        }
        this.enqueueLog('info', params);
    }
    error(...params) {
        if (!this.isProduction) {
            console.error(...params);
        }
        this.enqueueLog('error', params);
    }
}
exports.RemoteLogger = RemoteLogger;
