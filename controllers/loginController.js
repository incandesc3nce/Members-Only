const passport = require('../config/passport.config');

const loginController = async (req, res) => {
	if (req.user) {
    return res.redirect('/');
  }
  
  return res.render('login', {
		title: 'Log In',
    error: '',
	});
};

const loginPostController = (req, res, next) => {
	passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error('Login error:', err);
      return next(err);
    }
    if (!user) {
      console.error('Login failed:', info.message);
      return res.render('login', {
        title: 'Log In',
        error: `${info.message}`,
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
};

module.exports = {
	loginController,
	loginPostController,
};
