const {
	joinController,
	joinPostController,
} = require('../controllers/joinController');

const Router = require('express');

const joinRouter = Router();

joinRouter.get('/', joinController);
joinRouter.post('/', joinPostController);

module.exports = joinRouter;
