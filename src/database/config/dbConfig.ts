import * as Config from './config.json';
import { Sequelize } from 'sequelize';

const { username, host, database, password, port } = Config.development;

export const sequelize = new Sequelize(database, username, password, {
  host,
  port,
  dialect: 'postgres',
});

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
