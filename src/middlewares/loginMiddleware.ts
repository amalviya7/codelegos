import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
 
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
}).strict();

export const loginMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    loginSchema.parse(req.body);
    next();
  } catch (err:any) {
     res.status(400).send({ success: false, message: err.issues });
   
  }
};
