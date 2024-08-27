const { createUser, getUserByUsername } = require('../db/queries/usersQueries');
const hashPassword = require('../utils/hashPassword');
const passport = require('../config/passport.config');
const { body, validationResult } = require('express-validator');

const signUpController = async (req, res) => {
	res.render('sign-up', {
		title: 'Sign Up',
		errors: [],
	});
};

const validateForm = [
	body('first_name')
		.trim()
		.notEmpty()
		.withMessage('First name is required')
		.escape(),
	body('last_name')
		.trim()
		.notEmpty()
		.withMessage('Last name is required')
		.escape(),
	body('username')
		.trim()
		.notEmpty()
		.withMessage('Username is required')
		.isLength({ min: 3 })
		.withMessage('Username must be at least 3 characters')
		.isLength({ max: 20 })
		.withMessage('Username must be at most 20 characters')
		.matches(/^[a-zA-Z0-9_.]*$/)
		.withMessage(
			'Username must only contain letters, numbers, underscores, and periods',
		)
		.escape(),
	body('password')
		.notEmpty()
		.withMessage('Password is required')
		.isLength({ min: 8 })
		.withMessage('Password must be at least 8 characters')
		.isLength({ max: 24 })
		.withMessage('Password must be at most 24 characters')
		.matches(/[A-Z]/)
		.withMessage('Password must contain at least one uppercase letter')
		.matches(/[a-z]/)
		.withMessage('Password must contain at least one lowercase letter')
		.matches(/[0-9]/)
		.withMessage('Password must contain at least one number'),
	body('confirm_password')
		.custom((value, { req }) => value === req.body.password)
		.withMessage('Passwords do not match'),
];

const signUpPostController = [
	validateForm,
	async (req, res, next) => {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.render('sign-up', {
					title: 'Sign Up',
					errors: errors.array(),
				});
			}

			const { first_name, last_name, username, password } = req.body;

			const userExists = await getUserByUsername(username);
			if (userExists) {
				return res.render('sign-up', {
					title: 'Sign Up',
					errors: [{ msg: 'User with this username already exists.' }],
				});
			}

			const full_name = `${first_name} ${last_name}`;
			const hashedPassword = await hashPassword(password);
			await createUser(full_name, username, hashedPassword);

			passport.authenticate('local', (err, user, info) => {
				if (err) {
					console.error('Login error:', err);
					return next(err);
				}
				if (!user) {
					console.error('Login failed:', info.message);
					return res.render('login', {
						title: 'Log In',
						errors: [{ msg: `${info.message}` }],
					});
				}
				req.logIn(user, (err) => {
					if (err) {
						console.error('Login error:', err);
						return next(err);
					}
					return res.redirect('/');
				});
			})(req, res, next);
		} catch (err) {
			return next(err);
		}
	},
];

module.exports = {
	signUpController,
	signUpPostController,
};
