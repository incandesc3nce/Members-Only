const Router = require('express');
const { loginController, loginPostController } = require('../controllers/loginController');

const loginRouter = Router();

loginRouter.get('/', loginController);
loginRouter.post('/', loginPostController);

module.exports = loginRouter;
