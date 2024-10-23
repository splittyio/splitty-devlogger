"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remote = exports.dev = void 0;
var devLogger_1 = require("./devLogger");
Object.defineProperty(exports, "dev", { enumerable: true, get: function () { return devLogger_1.devLogger; } });
var remoteLogger_1 = require("./remoteLogger");
Object.defineProperty(exports, "remote", { enumerable: true, get: function () { return remoteLogger_1.remoteLogger; } });
