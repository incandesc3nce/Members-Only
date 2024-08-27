require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('./config/passport.config');
const path = require('path');
const {signUpController, signUpPostController} = require('./controllers/signUpController');
const logoutController = require('./controllers/logoutController');

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

app.get('/', (req, res) => {
	res.render('index', { title: 'Home', user: req.user });
});

app.get('/sign-up', signUpController);
app.post('/sign-up', signUpPostController);

app.get('/logout', logoutController);


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
