require('dotenv').config();
const { updateUserAdmin } = require('../db/queries/usersQueries');

const adminController = async (req, res) => {
	if (!req.user || req.user.is_admin) {
		return res.redirect('/');
	}

	res.render('admin', { title: 'Admin', user: req.user });
};

const adminPostController = async (req, res) => {
	const { password } = req.body;
	if (password === process.env.ADMIN_PASSWORD) {
		await updateUserAdmin(req.user.id);
		return res.redirect('/');
	} else {
		res.render('admin', { title: 'Admin', error: 'Wrong password!' });
	}
};

module.exports = {
	adminController,
	adminPostController,
};
