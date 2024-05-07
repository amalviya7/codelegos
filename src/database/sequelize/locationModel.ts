import { Model, Sequelize } from 'sequelize';
import { DataType } from 'sequelize-typescript';
export class LocationModel extends Model {
  // static objects: any;
}
export function initLocationModel(sequelize: Sequelize) {
  LocationModel.init(
    {
      id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      locationName: {
        type: DataType.STRING,
        allowNull: false,
        unique: true,
      },
      entityId: {
        type: DataType.INTEGER,
        references: {
          model: { tableName: 'Entities' },
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Location',
    }
  );
}
