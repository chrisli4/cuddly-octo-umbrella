'use strict';

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

var app = (0, _express2.default)();

// passport
var passport = require('passport');
var passportService = require('./passport');
var requireAuth = passport.authenticate('jwt', { session: false });
var requireLogin = passport.authenticate('local', { session: false });

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

// socket.io
var http = require('http').createServer(app);
var io = require('socket.io')(http);

io.on('connection', function (socket) {
  socket.on('userConnected', socket.join);
  socket.on('userDisconnected', socket.leave);
});

app.set('socketIo', io);

_mongoose2.default.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

var staticFiles = _express2.default.static(_path2.default.join(__dirname, '../../client/build'));
app.use(staticFiles);

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma');

  // intercept OPTIONS method
  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
  } else {
    next();
  }
});

// router
var authController = require('./routes/authRouter');
var userRouter = require('./routes/userRouter');

app.post('/register', authController.register);
app.post('/login', requireLogin, authController.login);
app.use('/users', requireAuth, userRouter);

// any routes not picked up by the server api will be handled by the react router
app.use('/*', staticFiles);

app.set('port', process.env.PORT || 3001);
http.listen(app.get('port'), function () {
  console.log('Listening on ' + app.get('port'));
});