import { Sequelize } from 'sequelize';
import { initLoginModel } from './loginModel';
import {initUsersModel} from './userModel'

/**
 *
 * @param {Sequelize} sequelize - The Sequelize instance.
 */
export function initModel(sequelize: Sequelize) {
  initLoginModel(sequelize);
  initUsersModel(sequelize);
}
