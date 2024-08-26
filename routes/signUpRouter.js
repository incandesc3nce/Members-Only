import { Router } from 'express';
import {
	signUpController,
	signUpPostController,
} from '../controllers/signUpController';

const signUpRouter = Router();

signUpRouter.get('/', signUpController);
signUpRouter.post('/', signUpPostController);

export default signUpRouter;
