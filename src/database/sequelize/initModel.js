"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initModel = void 0;
const loginModel_1 = require("./loginModel");
const userModel_1 = require("./userModel");
/**
 *
 * @param {Sequelize} sequelize - The Sequelize instance.
 */
function initModel(sequelize) {
    (0, loginModel_1.initLoginModel)(sequelize);
    (0, userModel_1.initUsersModel)(sequelize);
}
exports.initModel = initModel;
