import { Router } from 'express';
import userController from '../controllers/user_controllers.js';
import globalMiddlewares from '../middlewares/global_middlewares.js';

const userRoute = Router();

userRoute.post('/', userController.create_user)
userRoute.post('/verify-code', userController.CodeVerification)
userRoute.post('/login', userController.login)
userRoute.get('/me', userController.getUserData);

export default userRoute;