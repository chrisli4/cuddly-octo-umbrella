require('dotenv').config()

import bodyParser from 'body-parser'
import express from 'express'
import path from 'path'
import mongoose from 'mongoose'
const app = express()

// passport
const passport = require('passport');
const passportService = require('./passport');
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// socket.io
const http = require('http').createServer(app);
const io = require('socket.io')(http);

io.on('connection', (socket) => {
  socket.on('userConnected', socket.join)
  socket.on('userDisconnected', socket.leave)
})

app.set('socketIo', io);

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

const staticFiles = express.static(path.join(__dirname, '../../client/build'))
app.use(staticFiles)

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
})

// router
const authController = require('./routes/authRouter')
const userRouter = require('./routes/userRouter');

app.post('/register', authController.register);
app.post('/login', requireLogin, authController.login);
app.use('/users', requireAuth, userRouter);

// any routes not picked up by the server api will be handled by the react router
app.use('/*', staticFiles)

app.set('port', (process.env.PORT || 3001))
http.listen(app.get('port'), () => {
  console.log(`Listening on ${app.get('port')}`)
})