const LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
const { pick } = require('ramda');
const getUserData = pick(['login', 'games']);

const initPassport = passport => {
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
          if (user) throw new Error('This login has already been taken');
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
          if (!user.validPassword(password)) {
            throw new Error('Password is incorrect');
          }
          return done(null, user);
        } catch (e) {
          return done(e);
        }
      }
    )
  );
};

const signUp = passport => (request, response) => {
  passport.authenticate('local-signup', (err, user) => {
    if (err) {
      return response.json({ error: err.message });
    }
    request.login(user, () => {
      response.json(getUserData(user));
    });
  })(request, response);
};

const signIn = passport => (request, response) => {
  passport.authenticate('local-login', (err, user) => {
    if (err) {
      return response.json({ error: err.message });
    }
    request.login(user, () => {
      response.json(getUserData(user));
    });
  })(request, response);
};

const logout = (request, response) => {
  request.logout();
  response.json({ logout: true });
};

const restoreFromSession = ({ session: { passport } }, response) => {
  if (!passport || !passport.user) return response.json({ user: null });
  User.findOne({ _id: passport.user })
    .then(user => response.json(getUserData(user)))
    .catch(e => console.error(e));
};

const checkForExistance = ({ body: { login } }, response) =>
  User.findOne({ login })
    .then(user => response.json({ exist: user !== null }))
    .catch(e => console.error(e));

module.exports = {
  initPassport,
  logout,
  signIn,
  signUp,
  restoreFromSession,
  checkForExistance
};
