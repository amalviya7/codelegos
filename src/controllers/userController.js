"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.signUp_User = void 0;
const userServices_1 = require("../services/userServices");
const sequelize_1 = require("sequelize");
;
const signUp_User = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, userServices_1.createUser)(_req.body);
        res.status(201).json({ success: true, message: 'User created' });
    }
    catch (err) {
        const status = err instanceof sequelize_1.ValidationError || err instanceof sequelize_1.UniqueConstraintError
            ? 409
            : 400;
        const message = err instanceof sequelize_1.ValidationError || err instanceof sequelize_1.UniqueConstraintError
            ? err.errors.map((e) => ({ path: e.path, message: e.message }))
            : err.message;
        res.status(status).json({ success: false, message });
    }
});
exports.signUp_User = signUp_User;
const getUser = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, userServices_1.getUserDetails)(_req.params.id);
        return user
            ? res
                .status(200)
                .send({ success: true, message: 'User details found', data: user })
            : res.status(404).send({ success: false, message: 'User not found' });
    }
    catch (err) {
        res.status(400).send({ message: err });
    }
});
exports.getUser = getUser;
