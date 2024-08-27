require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('./config/passport.config');
const path = require('path');
const signUpRouter = require('./routes/signUpRouter');
const logoutController = require('./controllers/logoutController');
const loginRouter = require('./routes/loginRouter');
const newMessageRouter = require('./routes/newMessageRouter');
const PgSession = require('connect-pg-simple')(session);
const { getMessages } = require('./db/queries/messagesQueries');
const formatDate = require('./utils/formatDate');
const { getUserById } = require('./db/queries/usersQueries');
const joinRouter = require('./routes/joinRouter');
const adminRouter = require('./routes/adminRouter');
const deleteController = require('./controllers/deleteController');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// initialize persistent session storage

app.use(
	session({
		store: new PgSession({
			pool: require('./db/pool'),
			tableName: 'session',
			createTableIfMissing: true,
		}),
		secret: process.env.SESSION_SECRET || 'secret',
		resave: false,
		saveUninitialized: false,
		cookie: { sameSite: 'strict', maxAge: 1000 * 60 * 60 * 24 * 3 }, // 3 days
	}),
);

app.use(passport.session());

// routing

app.get('/', async (req, res) => {
	let messages = [];
	if (req.user) {
		messages = await getMessages();
		messages = await Promise.all(
			messages.map(async (message) => {
				message.date = formatDate(message.date);
				const user = await getUserById(message.author_id);
				message.author = user.full_name;
				return message;
			}),
		);
	}

	res.render('index', { title: 'Home', user: req.user, messages: messages });
});

app.use('/sign-up', signUpRouter);
app.use('/login', loginRouter);
app.use('/new', newMessageRouter);
app.use('/join', joinRouter);
app.use('/admin', adminRouter);

app.use('/delete/:id', deleteController);
app.get('/logout', logoutController);

// error handling

// 404 if requested route was not found, then pass to error handler

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
