"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupRoutes = void 0;
const loginroutes_1 = __importDefault(require("./loginroutes"));
const userRoutes_1 = __importDefault(require("../routes/userRoutes"));
/**
 *
 * @param {Express} app - The Express app instance to configure.
 */
function setupRoutes(app) {
    app.use('/api', loginroutes_1.default);
    app.use('/api', userRoutes_1.default);
}
exports.setupRoutes = setupRoutes;
