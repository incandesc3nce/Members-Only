const { Router } = require('express');
const {
	signUpController,
	signUpPostController,
} = require('../controllers/signUpController');

const signUpRouter = Router();

signUpRouter.get('/', signUpController);
signUpRouter.post('/', signUpPostController);

module.exports = signUpRouter;
