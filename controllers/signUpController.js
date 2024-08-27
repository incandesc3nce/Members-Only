const createUser = require('../db/queries/usersQueries');
const hashPassword = require('../utils/hashPassword');

const signUpController = async (req, res) => {
	res.render('sign-up', {
		title: 'Sign Up',
	});
};

const signUpPostController = async (req, res, next) => {
	try {
		const { full_name, username, password } = req.body;
    const hashedPassword = await hashPassword(password);
		await createUser(full_name, username, hashedPassword);
		res.redirect('/login');
	} catch (err) {
		return next(err);
	}
};

module.exports = {
	signUpController,
	signUpPostController,
};
