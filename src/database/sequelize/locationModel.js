"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initLocationModel = exports.LocationModel = void 0;
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
class LocationModel extends sequelize_1.Model {
}
exports.LocationModel = LocationModel;
function initLocationModel(sequelize) {
    LocationModel.init({
        id: {
            type: sequelize_typescript_1.DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
        },
        locationName: {
            type: sequelize_typescript_1.DataType.STRING,
            allowNull: false,
            unique: true,
        },
        entityId: {
            type: sequelize_typescript_1.DataType.INTEGER,
            references: {
                model: { tableName: 'Entities' },
                key: 'id',
            },
        },
    }, {
        sequelize,
        modelName: 'Location',
    });
}
exports.initLocationModel = initLocationModel;
