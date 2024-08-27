const { getUserByUsername } = require('../db/queries/usersQueries');
const passport = require('../config/passport.config');

const loginController = async (req, res) => {
  res.render('login', {
    title: 'Log In',
  });
}

const loginPostController = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
});

module.exports = {
  loginController,
  loginPostController
};
