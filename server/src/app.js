const express = require('express');
const cors = require('cors');
const http = require('http');
const { initializeSocket } = require('./socketManager');
const auth = require('./routes/auth');
const user = require('./routes/user');
const post = require('./routes/post');
const upload = require('./routes/upload');
const message = require('./routes/message');
const connectToDb = require('./utils/db');
const errorHandler = require('./middlewares/errorHandler');
const rateLimit = require('express-rate-limit');
const User = require('./models/User');

const app = express();
const server = http.createServer(app);
initializeSocket(server);

//! Cors Headers

connectToDb();
app.use(express.json());
app.use(express.static('public'));
User.updateMany();
//! Cors Options and Rate Limiter
const apiLimiter = new rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
var corsOptions = {
  origin: process.env.APP_URL,
  optionsSuccessStatus: 200,
  credentials: true,
};

//! All app uses
// app.use('/api/', apiLimiter);
app.use(cors());
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', user);
app.use('/api/v1/posts', post);
app.use('/api/v1/upload', upload);
app.use('/api/v1/messages', message);

app.use(errorHandler);

const PORT = 8080;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = { app };
