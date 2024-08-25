import 'dotenv/config';
import passport from 'passport';
import express from 'express';
import path from 'path';
import session from 'express-session';
import pool from './db/pool';
import PgSession from 'connect-pg-simple';

// just to satisfy TypeScript on line 47
declare module 'express-session' {
  interface SessionData {
    messages: string[];
  }
}

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

/*
 * routers
 */

/*
 * 404
 */

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(
	session({
		secret: process.env.SESSION_SECRET || '',
		resave: false,
		saveUninitialized: false,
		store: new (PgSession(session))({
			pool: pool,
			tableName: 'session',
			createTableIfMissing: true,
		}),
	}),
);

app.use(passport.session());

app.use((req, res, next) => {
	const messages = req.session.messages || [];
	res.locals.messages = messages;
	req.session.messages = [];
	next();
});

app.use((req, res, next) => {
	res.status(404).send('404 Not Found');
	next();
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err, req, res, next) => {
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	res.status(err.status || 500);
	res.render('error');
});

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

app.listen(Number(PORT), HOST, () => {
	console.log(`Server running at http://${HOST}:${PORT}`);
});
