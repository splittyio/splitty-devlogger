"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remote = exports.dev = void 0;
const remoteLogger_1 = require("./remoteLogger");
const devLogger_1 = require("./devLogger");
// Create a singleton instance of DevLogger
exports.dev = new devLogger_1.DevLogger();
exports.remote = new remoteLogger_1.RemoteLogger('https://api.yourloggingendpoint.com');
