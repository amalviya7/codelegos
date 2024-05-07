"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginMiddleware = void 0;
const zod_1 = require("zod");
const loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8),
}).strict();
const loginMiddleware = (req, res, next) => {
    try {
        loginSchema.parse(req.body);
        next();
    }
    catch (err) {
        res.status(400).send({ success: false, message: err.issues });
    }
};
exports.loginMiddleware = loginMiddleware;
