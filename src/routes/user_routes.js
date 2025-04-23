import { Router } from 'express';
import userController from '../controllers/user_controller.js';

const userRoute = Router();

userRoute.post('/user', userController.create_user)
userRoute.post('/CodeVerification', userController.CodeVerification)
userRoute.post('/login', userController.login)

export default userRoute;