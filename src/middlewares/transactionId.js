"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerSuccess = exports.logger = exports.transactionIdMiddleware = void 0;
const uuid_1 = require("uuid");
const morgan_1 = __importDefault(require("morgan"));
morgan_1.default.token('id', function getId(req) {
    return req.id;
});
const loggerFormat = ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :id';
const transactionIdMiddleware = (req, _res, next) => {
    req.id = (0, uuid_1.v4)();
    next();
};
exports.transactionIdMiddleware = transactionIdMiddleware;
const skipSuccess = (_req, res) => res.statusCode < 400;
const skipFailure = (_req, res) => res.statusCode >= 400;
exports.logger = (0, morgan_1.default)(loggerFormat, {
    skip: skipSuccess,
    stream: process.stderr,
});
exports.loggerSuccess = (0, morgan_1.default)(loggerFormat, {
    skip: skipFailure,
    stream: process.stdout,
});
