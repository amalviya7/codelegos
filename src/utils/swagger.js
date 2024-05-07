"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const swaggerDocument = JSON.parse(fs_1.default.readFileSync(path_1.default.resolve(__dirname, '..', 'swagger.json'), 'utf8'));
/**
 *
 * @param {Express} app - The Express app instance to configure.
 */
function setupSwagger(app) {
    if (process.env.NODE_ENV !== 'production') {
        app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
    }
}
exports.default = setupSwagger;
