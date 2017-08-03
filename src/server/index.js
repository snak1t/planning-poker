const express = require('express');
const app = express();
const passport = require('passport');
require('dotenv').config();

const appConfig = require('./config/config');

//Databases configuration
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(appConfig.DB.URL, {
  useMongoClient: true
});

//App configuration
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.raw());
app.use(bodyParser.json());
app.use(
  session({
    secret: 'freeplanningpoker',
    resave: true,
    saveUninitialized: true
  })
);
app.use(flash());

//Passport Initialization
app.use(passport.initialize());
app.use(passport.session());
const { initPassport } = require('./controllers/auth.controller');
initPassport(passport);

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header(
    'Access-Control-Allow-Methods',
    'DELETE, GET, POST, PUT, PATCH, HEAD, OPTIONS, TRACE'
  );
  next();
});

//Routes
require('./routes/games')(app);
require('./routes')(app, passport);

const socketIO = require('socket.io');

const port = process.env.PORT || 3100;

const withSocketsController = require('./controllers/sockets.controller');

// GraphQL

const { schema } = require('./schemas/index');
const graphqlHTTP = require('express-graphql');

app.use(
  '/apiv2',
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

withSocketsController(
  socketIO.listen(
    app.listen(port, () => {
      console.log(`App is listening on ${port}`);
    })
  )
);
