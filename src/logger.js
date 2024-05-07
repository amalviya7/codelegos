"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const logger = winston_1.default.createLogger({
    level: 'info',
    format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.printf(({ timestamp, level, message, transactionId }) => {
        return `[${timestamp}] [${transactionId}] ${level}: ${message}`;
    })),
    transports: [
        new winston_1.default.transports.Console(),
        // Add other transports like File or Http, if needed
    ],
});
exports.default = logger;
