const { createUser, getUserByUsername } = require('../db/queries/usersQueries');
const hashPassword = require('../utils/hashPassword');
const passport = require('../config/passport.config');

const signUpController = async (req, res) => {
	res.render('sign-up', {
		title: 'Sign Up',
	});
};

const signUpPostController = async (req, res, next) => {
	try {
		const { first_name, last_name, username, password } = req.body;
		
		const userExists = await getUserByUsername(username);
		if (userExists) {
			return res.render('sign-up', {
				title: 'Sign Up',
				errors: [{msg: 'Username already exists'}],
			});
		}

		const full_name = `${first_name} ${last_name}`;
    const hashedPassword = await hashPassword(password);
		await createUser(full_name, username, hashedPassword);

		passport.authenticate('local', {
			successRedirect: '/',
			failureRedirect: '/login',
			failureFlash: true,
		})(req, res, next);
	} catch (err) {
		return next(err);
	}
};

module.exports = {
	signUpController,
	signUpPostController,
};
