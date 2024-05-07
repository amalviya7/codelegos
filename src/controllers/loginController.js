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
exports.sendOtpMail = exports.resetPassword = exports.changePassword = exports.getUserLogin = void 0;
const loginServices_1 = require("../services/loginServices");
const sendEmail_1 = require("../utils/sendEmail");
const getUserLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const data = yield (0, loginServices_1.loginUserService)(email, password);
        if (data.success)
            res.status(200).send(data);
        else
            res.status(401).send(data);
    }
    catch (err) {
        res.status(400).send({ success: false, err });
    }
});
exports.getUserLogin = getUserLogin;
const changePassword = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, loginServices_1.updatePassword)(_req);
        return res
            .status(200)
            .send({ message: 'Password Changed successfully', data: data });
    }
    catch (err) {
        console.log('***', err);
    }
});
exports.changePassword = changePassword;
const resetPassword = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, loginServices_1.sendMail)(_req);
        return res
            .status(200)
            .send({ message: 'Link send successfully', data: data });
    }
    catch (err) {
        console.log('***', err);
    }
});
exports.resetPassword = resetPassword;
const sendOtpMail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        if (email) {
            const userDetails = yield (0, sendEmail_1.sendEmail)(email);
            if (userDetails) {
                res.status(200).json({ success: true, user: userDetails });
            }
            else {
                res.status(404).json({ success: false, message: 'User not found' });
            }
        }
    }
    catch (err) {
        res.status(400).send({ success: false, err });
    }
});
exports.sendOtpMail = sendOtpMail;
