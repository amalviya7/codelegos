import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

const registrationSchema = z
  .object({
    email: z.string().email(),
    first_name: z.string({
      required_error: 'First Name is required',
      invalid_type_error: 'First Name must be a string',
    }),
    last_name: z.string({
      required_error: 'Last name is required',
      invalid_type_error: 'Name must be a string',
    }),
    contact_number: z
      .string({
        required_error: 'Mobile number is required',
      })
      .length(10),
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(8, 'Minimum length should be 8'),
    displayPicture: z.string().optional(),
    userType: z.string(),
    status: z.string(),
  })
  .strict();

const validateRegistrationData = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    registrationSchema.parse(req.body);
    next();
  } catch (error:any) {
    console.info('Validation Error : ', error);
    res.status(400).send({ success: false, message: error.issues[0].message });
  }
};

export default validateRegistrationData;
