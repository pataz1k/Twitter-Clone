const express = require('express');
const cors = require('cors');
const auth = require('./routes/auth');
const user = require('./routes/user');
const post = require('./routes/post');
const upload = require('./routes/upload');
const message = require('./routes/message');
const connectToDb = require('./utils/db');
const errorHandler = require('./middlewares/errorHandler');
const rateLimit = require('express-rate-limit');
const Message = require('./models/Message');

const { Server } = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

//! Cors Headers
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', true);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
});

connectToDb();
app.use(express.json());
app.use(express.static('public'));

//! Cors Options and Rate Limiter
const apiLimiter = new rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
var corsOptions = {
  origin: process.env.URI || 'http://localhost:3000',
  optionsSuccessStatus: 200,
  credentials: true,
};

//! All app uses
app.use('/api/', apiLimiter);
app.use(cors(corsOptions));
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', user);
app.use('/api/v1/posts', post);
app.use('/api/v1/upload', upload);
app.use('/api/v1/messages', message);

app.use(errorHandler);

//! Socket.io
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('join', (username) => {
    console.log('user joined room', username);
    socket.join(username);
  });

  socket.on('message', async (message) => {
    console.log('message received', message.message);
    console.log('user', message.sender);

    try {
      // Save message to database
      const newMessage = new Message({
        sender: message.sender,
        receiver: message.receiver,
        message: message.message,
      });
      await newMessage.save();

      // Emit message to sender and receiver
      io.to(message.sender).to(message.receiver).emit('message', newMessage);
    } catch (err) {
      console.error('Error saving message:', err);
    }
  });
});

const PORT = 8080;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = { app };
