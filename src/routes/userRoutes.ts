import express from "express";
import { signUp_User, getUser } from '../controllers/userController';
import validateRegistrationData from "../middlewares/userRegistrationMiddleware";

const router = express.Router();

//signUp  
router.post('/signUp', validateRegistrationData, signUp_User);

router.get('/user/:id', getUser);
 

export default router;