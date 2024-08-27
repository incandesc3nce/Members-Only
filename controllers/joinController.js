const { updateUserStatus } = require('../db/queries/usersQueries');

const joinController = async (req, res) => {
	if (!req.user || req.user.is_member) {
		res.redirect('/');
	}

	res.render('join', { title: 'Join', user: req.user, error: '' });
};

const joinPostController = async (req, res) => {
	const { answer } = req.body;
	if (answer === '42') {
		await updateUserStatus(req.user.id);
		res.redirect('/');
	} else {
		res.render('join', { title: 'Join', error: 'Wrong answer!' });
	}
};

module.exports = {
	joinController,
	joinPostController,
};
