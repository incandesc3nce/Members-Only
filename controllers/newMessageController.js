const { createMessage } = require('../db/queries/messagesQueries');

const newMessageGetController = async (req, res) => {
	if (!req.user) {
		return res.redirect('/login');
	}

	return res.render('new', { title: 'New Message', user: req.user });
};

const newMessagePostController = async (req, res) => {
	const { title, body } = req.body;
	const author_id = req.user.id;

	try {
		await createMessage(title, body, author_id);
		res.redirect('/');
	} catch (err) {
		console.error('Error creating message:', err);
		res.render('new', {
			title: 'New Message',
			user: req.user,
			error: 'An error occurred. Please try again.',
		});
	}
};

module.exports = {
	newMessageGetController,
	newMessagePostController,
};
