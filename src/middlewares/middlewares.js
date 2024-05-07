"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exampleMiddleware = void 0;
/**
 *
 /**
 * Handle GET request to get examples
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Next function
 */
function exampleMiddleware(req, res, next) {
    console.log('Example middleware executed');
    next();
}
exports.exampleMiddleware = exampleMiddleware;
