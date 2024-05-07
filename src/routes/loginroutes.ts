import express from 'express';
import {
  changePassword,
  getUserLogin,
  resetPassword,
} from '../controllers/loginController';
import * as p from '../middlewares/loginMiddleware';
import { sendOtpMail } from '../controllers/loginController';
import { validationEmailMiddleware } from '../middlewares/validationEmailMiddleware';

const router = express.Router(); 
router.post('/send-otp', validationEmailMiddleware, sendOtpMail);
router.post('/login', p.loginMiddleware, getUserLogin);


router.post('/changePassword', changePassword);
router.post('/resetPassword', resetPassword);

export default router;
