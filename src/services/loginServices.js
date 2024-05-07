"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserService = exports.sendMail = exports.updatePassword = void 0;
const userModel_1 = require("../database/sequelize/userModel");
const createTokens_1 = __importDefault(require("../utils/createTokens"));
const nodemailer = __importStar(require("nodemailer"));
const hashedPassword_1 = require("../utils/hashedPassword");
const updatePassword = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, token } = req.body;
    let user;
    if (email) {
        user = yield userModel_1.UsersModel.findOne({
            where: { email: email },
        });
    }
    else if (token) {
        user = yield userModel_1.UsersModel.findOne({
            where: { resetToken: token },
        });
    }
    const salt = (0, hashedPassword_1.generateSalt)();
    const hashedpassword = (0, hashedPassword_1.hashPassword)(req === null || req === void 0 ? void 0 : req.body.password, salt);
    if (user) {
        user.update({ password: hashedpassword, salt: salt });
    }
    else {
        throw 'user not found';
    }
});
exports.updatePassword = updatePassword;
const sendMail = (req) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('send mail', req);
    const user = yield userModel_1.UsersModel.findOne({
        where: { email: req.body.email },
    });
    if (user) {
        // Generate a unique token for password reset
        const { token } = yield (0, createTokens_1.default)(user.email);
        console.log('reset Tokens', token);
        // Save the reset token in the database
        user.resetToken = token;
        yield user.save();
        // Create Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'pranayshukla9926@gmail.com',
                pass: 'kgoi vbjx rsok qeax',
            },
        });
        // Send email with password reset link
        const mailOptions = {
            from: 'pranayshukla9926@gmail.comm',
            to: user.email,
            subject: 'Password Reset',
            html: `<!doctype html><html lang="en-US"><head> <meta content="text/html; charset=utf-8" http-equiv="Content-Type" /> <title>Reset Password Email Template</title> <meta name="description" content="Reset Password Email Template."> <style type="text/css"> a:hover { text-decoration: underline !important; } </style></head><body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0"> <!--100% body table--> <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8" style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;"> <tr> <td> <table style="background-color: #f2f3f8; max-width:670px; margin:0 auto;" width="100%" border="0" align="center" cellpadding="0" cellspacing="0"> <tr> <td style="height:80px;">&nbsp;</td> </tr> <tr> <td style="height:20px;">&nbsp;</td> </tr> <tr> <td> <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);"> <tr> <td style="height:40px;">&nbsp;</td> </tr> <tr> <td style="padding:0 35px;"> <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;"> You have requested to reset your password</h1> <span style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span> <p style="color:#455056; font-size:15px;line-height:24px; margin:0;"> We cannot simply send you your old password. A unique link to reset your password has been generated for you. To reset your password, click the following link and follow the instructions. </p> <a href="http://192.168.101.45:3000/signup?token:${token}" style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px; cursor: pointer; ">Reset Password</a> </td> </tr> <tr> <td style="height:40px;">&nbsp;</td> </tr> </table> </td> <tr> <td style="height:20px;">&nbsp;</td> </tr></table> <!--/100% body table--></body></html>`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('send mail', error);
            }
            else {
                console.log(user.email);
                console.log('Email sent: ' + info.response);
                return info.response;
            }
        });
    }
    else {
        throw 'user not found';
    }
});
exports.sendMail = sendMail;
const loginUserService = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const errorObject = {
        success: false,
        message: 'Invalid credentials',
        status: 400,
    };
    const user = yield userModel_1.UsersModel.findOne({
        where: { email: email.toLowerCase() },
    });
    console.log(user, 'userrrrrr');
    if (!user) {
        throw { success: false, status: 404, message: 'user not found' };
    }
    const salt = user.dataValues.salt;
    const hashedPassword = (0, hashedPassword_1.hashPassword)(password, salt);
    if (hashedPassword !== user.dataValues.password) {
        throw errorObject;
    }
    const { token, refreshToken } = yield (0, createTokens_1.default)({
        email,
    });
    const result = yield user.update({
        token,
        refreshToken,
    });
    if (result)
        return {
            success: true,
            token,
            refreshToken,
        };
    throw errorObject;
});
exports.loginUserService = loginUserService;
