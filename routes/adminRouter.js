const {
	adminController,
	adminPostController,
} = require('../controllers/adminController');

const Router = require('express');

const adminRouter = Router();

adminRouter.get('/', adminController);
adminRouter.post('/', adminPostController);

module.exports = adminRouter;
