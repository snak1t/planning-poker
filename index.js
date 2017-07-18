const express = require('express');
const app = express();
const path = require('path');
const passport = require('passport');
require('dotenv').config();

const appConfig = require('./server/config/config');

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
require('./server/controllers/auth')(passport);

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

app.use(express.static(__dirname + '/build'));
//Routes
require('./server/routes/games')(app);
require('./server/routes')(app, passport);

const socketIO = require('socket.io');

const port = process.env.PORT || 3000;

const withSocketsController = require('./server/controllers/sockets');

withSocketsController(
  socketIO.listen(
    app.listen(port, () => {
      console.log(`App is listening on ${port}`);
    })
  )
);
