import { Request, Response } from 'express';
import {
  loginUserService,
  sendMail,
  updatePassword,
} from '../services/loginServices';
import { SignUpNameSpace } from '../../custom';
import { sendEmail } from '../utils/sendEmail';


export const getUserLogin = async (req: Request, res: Response) => {

  try {
    const { email, password } = req.body;
    const data: SignUpNameSpace.Login_Response = await loginUserService(email, password);
    if (data.success) res.status(200).send(data);
    else res.status(401).send(data);
  } catch (err) {
    res.status(400).send({ success: false, err });
  }
};

export const changePassword = async (_req: Request, res: Response) => {
  try {
    const data = await updatePassword(_req);
    return res
      .status(200)
      .send({ message: 'Password Changed successfully', data: data });
  } catch (err) {
    console.log('***', err);
  }
};

export const resetPassword = async (_req: Request, res: Response) => {
  try {
    const data = await sendMail(_req);
    return res
      .status(200)
      .send({ message: 'Link send successfully', data: data });
  } catch (err) {
    console.log('***', err);
  }
}
export const sendOtpMail = async (req: Request, res: Response) => {
  try {
    const { email} = req.body;
    if(email){
      const userDetails:any = await sendEmail(email);
       if (userDetails) {
         res.status(200).json({ success: true, user: userDetails });
       } else {
         res.status(404).json({ success: false, message: 'User not found' });
       }
    }
  } catch (err) {
    res.status(400).send({ success: false, err });
  }
};
