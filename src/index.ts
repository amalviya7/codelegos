import dotenv from 'dotenv';
import express from 'express';
import { sequelize } from '../src/database/config/dbConfig';
import { initModel } from './database/sequelize/initModel';
import {
  logger,
  loggerSuccess,
  transactionIdMiddleware,
} from './middlewares/transactionId';
import { setupRoutes } from './routes';
import setupSwagger from './utils/swagger';

dotenv.config();

const app = express();
const port = process.env.APP_PORT || 3001;

app.use(express.json());
app.use(transactionIdMiddleware);
app.use(logger);
app.use(loggerSuccess);
try {
  initModel(sequelize);

  // sequelize.sync({force: true})
  sequelize.sync();
  console.log('Table created successfully');
} catch (err) {
  console.log(err, 'error occured');
}

setupSwagger(app);
setupRoutes(app); 

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
