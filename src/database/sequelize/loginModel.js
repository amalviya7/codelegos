"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initLoginModel = exports.LoginModel = void 0;
const sequelize_1 = require("sequelize");
class LoginModel extends sequelize_1.Model {
}
exports.LoginModel = LoginModel;
/**
 * Initialize the LoginModel.
 *
 * @param {Sequelize} sequelize - The Sequelize instance.
 */
function initLoginModel(sequelize) {
    LoginModel.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            comment: 'Auto increment primary key'
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        contactNumber: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        token: {
            type: sequelize_1.DataTypes.STRING(1500),
            allowNull: false
        },
        refreshToken: {
            type: sequelize_1.DataTypes.STRING(1500),
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'Login',
    });
}
exports.initLoginModel = initLoginModel;
