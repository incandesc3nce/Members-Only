import { Request, Response } from 'express';
import { getUserByUsername, createUser } from '../db/queries/usersQueries';
import { body, validationResult } from 'express-validator';
import hashPassword from '../utils/hashPassword';

const signUpController = async (req: Request, res: Response) => {
	res.render('signUp', { title: 'Sign Up', errors: [] });
};

const signUpPostController = async (req: Request, res: Response) => {
	body('first_name')
		.trim()
		.notEmpty()
		.withMessage('First name is required')
		.escape();
	body('last_name')
		.trim()
		.notEmpty()
		.withMessage('Last name is required')
		.escape();
	body('username')
		.trim()
		.notEmpty()
		.withMessage('Username is required')
		.isLength({ min: 8 })
		.withMessage('Username must be at least 8 characters long')
		.isLength({ max: 24 })
		.withMessage('Username must be at most 24 characters long')
		.matches(/^[a-zA-Z0-9_.]+$/)
		.withMessage(
			'Username must contain only letters, numbers, underscores, and periods',
		)
		.escape();
	body('password')
		.notEmpty()
		.withMessage('Password is required')
		.isLength({ min: 8 })
		.withMessage('Password must be at least 8 characters long')
		.isLength({ max: 24 })
		.withMessage('Password must be at most 24 characters long')
		.matches(/^[A-Z]/)
		.withMessage('Password must contain at least one uppercase letter')
		.matches(/^[a-z]/)
		.withMessage('Password must contain at least one lowercase letter')
		.matches(/^[0-9]/)
		.withMessage('Password must contain at least one number');
	body('confirm_password')
		.notEmpty()
		.withMessage('Confirm password is required')
		.custom((value, { req }) => value === req.body.password)
		.withMessage('Passwords do not match');

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).render('signUp', {
			title: 'Sign Up',
			errors: errors.array(),
		});
	}

	try {
		const { first_name, last_name, username, password } = req.body;
		const user = await getUserByUsername(username);
		if (user) {
			return res.status(400).render('signUp', {
				title: 'Sign Up',
				errors: [{ msg: 'Username is already taken' }],
			});
		}
		const hashedPassword = await hashPassword(password);
		const full_name = `${first_name} ${last_name}`;
		await createUser(full_name, username, hashedPassword);

		const newUser = await getUserByUsername(username);
		req.login(newUser, (err) => {
			if (err) {
        console.error('Error during logging in after sign-up:', err);
				return res.status(500).render('signUp', {
          title: 'Sign Up',
          errors: [{ msg: 'An error occurred during logging-in after a sign-up. Please log in manually.' }],
        });
			}
      res.redirect('/');
		});
	} catch (err) {
		console.error(err);
		return res.status(500).render('signUp', {
      title: 'Sign Up',
      errors: [{ msg: 'An error occurred during sign-up. Please try again.' }],
    });
	}
};

export { signUpController, signUpPostController };
