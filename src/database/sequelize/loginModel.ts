import { DataTypes, Model, Sequelize } from 'sequelize';

export class LoginModel extends Model { }

/**
 * Initialize the LoginModel.
 *
 * @param {Sequelize} sequelize - The Sequelize instance.
 */
export function initLoginModel(sequelize: Sequelize) {
    LoginModel.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                comment:'Auto increment primary key'
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            contactNumber: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            token: {
                type: DataTypes.STRING(1500),
                allowNull : false
            },
            refreshToken: {
                type: DataTypes.STRING(1500),
                allowNull: false
            },
        },
        {
            sequelize,
            modelName: 'Login',
        }
    );
}
