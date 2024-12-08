const { Server } = require('socket.io');
const Message = require('./models/Message');
const User = require('./models/User');

let io;

function initializeSocket(server) {
  io = new Server(server, {
    cors: {
      origin: '*',
    },
  });
  io.engine.on('connection_error', (err) => {
    console.log(err.req); // the request object
    console.log(err.code); // the error code, for example 1
    console.log(err.message); // the error message, for example "Session ID unknown"
    console.log(err.context); // some additional error context
  });

  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });

    socket.on('join', (username) => {
      socket.join(username);
      console.log(`User ${username} joined`);
    });

    socket.on('message', async (message) => {
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

        // Send notification
        const { sendNotification } = require('./controllers/notification');
        await sendNotification(message.receiver, message.message, message.sender);
      } catch (err) {
        console.error('Error handling message:', err);
      }
    });

    // Add a new event listener for 'notification' events
    socket.on('notification', async (notificationData) => {
      try {
        // Emit the notification to the appropriate user
        io.to(notificationData.receiver).emit('notification', notificationData);
        console.log(`Notification sent to ${notificationData.receiver}`);
      } catch (err) {
        console.error('Error handling notification:', err);
      }
    });
  });

  return io;
}

function getIO() {
  if (!io) {
    throw new Error('Socket.io not initialized');
  }
  return io;
}

module.exports = { initializeSocket, getIO };
