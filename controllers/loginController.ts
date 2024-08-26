import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import { getUserByUsername } from '../db/queries/usersQueries';

const loginController = async (req: Request, res: Response) => {
	res.render('login', { title: 'Login', errors: [] });
};

const loginPostController = async (req: Request, res: Response) => {
	body('username')
		.trim()
		.notEmpty()
		.withMessage('Username is required')
		.escape();
	body('password').notEmpty().withMessage('Password is required');

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).render('login', {
			title: 'Login',
			errors: errors.array(),
		});
	}

	try {
		const { username, password } = req.body;
		const user = await getUserByUsername(username);

		if (!user) {
			return res.status(400).render('login', {
				title: 'Login',
				errors: [{ msg: 'This user does not exist' }],
			});
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			return res.status(400).render('login', {
				title: 'Login',
				errors: [{ msg: 'Invalid username or password' }],
			});
		}

		req.login(user, (err) => {
			if (err) {
				return res.status(500).render('login', {
					title: 'Login',
					errors: [{ msg: 'There was an error logging in. Please try again.' }],
				});
			}
			res.redirect('/');
		});
	} catch (error) {
		console.error(error);
		return res.status(500).render('login', {
			title: 'Login',
			errors: [{ msg: 'An error occurred during login. Please try again.' }],
		});
	}
};

export { loginController, loginPostController };
