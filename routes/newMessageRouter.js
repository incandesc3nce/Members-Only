const Router = require('express');
const { newMessageGetController, newMessagePostController } = require('../controllers/newMessageController');

const newMessageRouter = Router();

newMessageRouter.get('/', newMessageGetController);
newMessageRouter.post('/', newMessagePostController);

module.exports = newMessageRouter;
