const Router = require('express');
const loginController =
	require('../controllers/loginController').loginController;
const loginPostController =
	require('../controllers/loginController').loginPostController;

const loginRouter = Router();

loginRouter.get('/', loginController);
loginRouter.post('/', loginPostController);

module.exports = loginRouter;
