const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const usersQueries = require('../db/queries/usersQueries');

passport.use(new LocalStrategy(
	async (username, password, done) => {
		try {
			const user = await usersQueries.getUserByUsername(username);
			if (!user) {
				return done(null, false, { message: 'This user does not exist.' });
			}
			
			const valid = await bcrypt.compare(password, user.password);
			if (!valid) {
				return done(null, false, { message: 'Incorrect username or password.' });
			}
			
			return done(null, user);
		} catch (err) {
			console.error('There was an error logging in:', err);
			return done(err);
		}
	}
));

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const user = await usersQueries.getUserById(id);
		done(null, user);
	} catch(err) {
		done(err);
	}
});

module.exports = passport;