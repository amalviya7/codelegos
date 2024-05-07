import { Express } from 'express';
import loginRoutes from './loginroutes';
import userRoutes from '../routes/userRoutes';


/**
 *
 * @param {Express} app - The Express app instance to configure.
 */

export function setupRoutes(app: Express) {
 
  app.use('/api',loginRoutes);
  app.use('/api', userRoutes);
} 
