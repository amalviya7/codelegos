import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

const otpSendSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
  })
  .strict();

export const validationEmailMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    otpSendSchema.parse(req.body);
    next();
  } catch (err: any) {
    res.status(400).send({ success: false, message: err.issues });
  }
};
