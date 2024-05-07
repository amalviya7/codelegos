"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = exports.generateSalt = void 0;
const crypto_1 = __importDefault(require("crypto"));
const generateSalt = () => {
    return crypto_1.default.randomBytes(16).toString('hex');
};
exports.generateSalt = generateSalt;
const hashPassword = (password, salt) => {
    const iterations = 10000; // Number of iterations
    const keyLength = 64; // Desired key length in bytes
    const digest = 'sha512'; // Hashing algorithm
    const derivedKey = crypto_1.default.pbkdf2Sync(password, salt, iterations, keyLength, digest);
    return derivedKey.toString('hex');
};
exports.hashPassword = hashPassword;
