import { Request, Response } from 'express';
import {
  createUser,
  getUserDetails
} from '../services/userServices';
import { ValidationError, UniqueConstraintError } from 'sequelize';
;


export const signUp_User = async (_req: Request, res: Response) => {
  try {
      await createUser(_req.body);
      res.status(201).json({ success: true, message: 'User created' });
  } catch (err:any) {
   const status =
     err instanceof ValidationError || err instanceof UniqueConstraintError
       ? 409
       : 400;
   const message =
     err instanceof ValidationError || err instanceof UniqueConstraintError
       ? err.errors.map((e) => ({ path: e.path, message: e.message }))
       : err.message;

   res.status(status).json({ success: false, message });
  }
};

export const getUser = async (_req: Request, res: Response) => {
  try {
    const user = await getUserDetails(_req.params.id);
    return user
      ? res
          .status(200)
          .send({ success: true, message: 'User details found', data: user })
      : res.status(404).send({ success: false, message: 'User not found' });
  } catch (err) {
    res.status(400).send({ message: err });
  }
};

