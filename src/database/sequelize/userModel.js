"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initUsersModel = exports.UsersModel = void 0;
const sequelize_1 = require("sequelize");
class UsersModel extends sequelize_1.Model {
}
exports.UsersModel = UsersModel;
/**
 * Initialize the LoginModel.
 *
 * @param {Sequelize} sequelize - The Sequelize instance.
 */
function initUsersModel(sequelize) {
    UsersModel.init({
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.UUIDV4,
            primaryKey: true,
            comment: 'Auto increment primary key',
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        first_name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        last_name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        contact_number: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
            unique: true,
        },
        password: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        salt: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        displayPicture: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        userType: {
            type: sequelize_1.DataTypes.ENUM('Admin', 'User', 'Super Admin'),
            allowNull: false,
            defaultValue: 'User',
        },
        status: {
            type: sequelize_1.DataTypes.ENUM('Active', 'Disabled'),
            allowNull: false,
            defaultValue: 'Active',
        },
        resetToken: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true,
        },
    }, {
        sequelize,
        modelName: 'Users',
    });
}
exports.initUsersModel = initUsersModel;
