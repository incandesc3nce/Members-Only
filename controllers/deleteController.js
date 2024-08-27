const { deleteMessage } = require('../db/queries/messagesQueries');

const deleteController = async (req, res) => {
	const { id } = req.params;
	const user = req.user;
	if (!user || !user.is_admin) {
		return res.redirect('/');
	}

	await deleteMessage(id);
	return res.redirect('/');
};

module.exports = deleteController;
