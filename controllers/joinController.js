const { updateUserStatus } = require('../db/queries/usersQueries');

const joinController = async (req, res) => {
	if (!req.user || req.user.is_member) {
		return res.redirect('/');
	}

	res.render('join', { title: 'Join', user: req.user, error: '' });
};

const joinPostController = async (req, res) => {
	const { answer } = req.body;
	if (answer === '42') {
		await updateUserStatus(req.user.id);
		return res.redirect('/');
	} else {
		return res.render('join', { title: 'Join', user: req.user, error: 'Wrong answer!' });
	}
};

module.exports = {
	joinController,
	joinPostController,
};
