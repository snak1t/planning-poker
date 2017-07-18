const LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
module.exports = passport => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  passport.use(
    'local-signup',
    new LocalStrategy(
      {
        usernameField: 'login',
        passwordField: 'password',
        passReqToCallback: true
      },
      async (req, login, password, done) => {
        try {
          const user = await User.findOne({ login: login });
          if (user) throw new Error('This login was already taken');
          const newUser = new User();
          newUser.login = login;
          newUser.password = newUser.generateHash(password);
          newUser.games = [];
          newUser.save();
          return done(null, newUser);
        } catch (e) {
          done(e);
        }
      }
    )
  );

  passport.use(
    'local-login',
    new LocalStrategy(
      {
        usernameField: 'login',
        passwordField: 'password',
        passReqToCallback: true
      },
      async (req, login, password, done) => {
        try {
          const user = await User.findOne({ login: login });
          if (!user) throw new Error('There is no such user with this login');
          if (!user.validPassword(password))
            throw new Error('Password is incorrect');
          return done(null, user);
        } catch (e) {
          return done(e);
        }
      }
    )
  );
};
