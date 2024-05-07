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
exports.getUserDetails = exports.createUser = void 0;
const userModel_1 = require("../database/sequelize/userModel");
const hashedPassword_1 = require("../utils/hashedPassword");
const createUser = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = (0, hashedPassword_1.generateSalt)();
    const hashedpassword = (0, hashedPassword_1.hashPassword)(req.password, salt);
    try {
        return yield userModel_1.UsersModel.create({
            first_name: req.first_name,
            last_name: req.last_name,
            email: req.email,
            contact_number: req.contact_number,
            password: hashedpassword,
            salt: salt,
        });
    }
    catch (error) {
        throw error;
        return { status: 400, error: error.errors[0].message };
    }
});
exports.createUser = createUser;
const getUserDetails = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userModel_1.UsersModel.findOne({
        where: {
            id: userId,
            isActive: true,
        },
    });
});
exports.getUserDetails = getUserDetails;
