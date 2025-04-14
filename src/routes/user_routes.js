import { Router } from 'express';
import userController from '../controllers/user_controller.js';

const userRoute = Router();

userRoute.post('/api/user', userController.create_user)
userRoute.post('/api/CodeVerification', userController.CodeVerification)

export default userRoute;