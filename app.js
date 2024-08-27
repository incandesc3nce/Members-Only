require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const path = require('path');
const bcrypt = require('bcryptjs');
const usersQueries = require('./db/queries/usersQueries');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
	secret: process.env.SESSION_SECRET || 'secret',
	resave: false,
	saveUninitialized: false,
	cookie: { sameSite: 'strict' },
}));

app.use(passport.session());

passport.use(new LocalStrategy(
	async (username, password, done) => {
		try {
			const user = await usersQueries.getUserByUsername(username);
			if (!user) {
				return done(null, false, { message: 'Incorrect username or password.' });
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


app.get('/', (req, res) => {
	res.render('index', { title: 'Home' });
});

app.use((req, res, next) => {
	res.status(404).send('404 Not Found');
	next();
});

app.use((err, req, res, next) => {
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	console.error(err);
	res.status(err.status || 500);
	res.render('error');
});

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

app.listen(Number(PORT), HOST, () => {
	console.log(`Server running at http://${HOST}:${PORT}`);
});
