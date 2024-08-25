import Strategy from 'passport-local';
import { getUserById, getUserByUsername } from '../db/queries/usersQueries';
import bcrypt from 'bcryptjs';
import User from '../types/User';

const LocalStrategy = Strategy.Strategy;

export default function configurePassport(passport) {
	passport.use(
		new LocalStrategy(async (username, password, done) => {
			try {
				const { rows } = await getUserByUsername(username);
				const user: User = rows[0];

				if (!user) {
					return done(null, false, {
						message: 'Incorrect username or password.',
					});
				}

				const match = await bcrypt.compare(password, user.password);

				if (!match) {
					return done(null, false, {
						message: 'Incorrect password or password.',
					});
				}

				return done(null, user);
			} catch (err) {
				return done(err);
			}
		}),
	);

	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser(async (id: number, done) => {
		try {
			const { rows } = await getUserById(id);
			const user = rows[0];
			done(null, user);
		} catch (err) {
			done(err);
		}
	});
}
