const authController = require('../controllers/auth.controller');

module.exports = (app, passport) => {
  app.post('/api/signup', authController.signUp(passport));
  app.post('/api/login', authController.signIn(passport));
  app.get('/api/logout', authController.logout);
  app.get('/api/user', authController.restoreFromSession);
  app.post('/api/login/check', authController.checkForExistance);
};
