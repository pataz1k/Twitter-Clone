const { getIO } = require('../socketManager');
const User = require('../models/User');

exports.sendNotification = async (receivers, message, senderId) => {

    try {
        const io = getIO();
        const user = await User.findOne({ _id: senderId });
        if (!user) {
            throw new Error('Sender user not found');
        }

        const notificationData = {
            text: message,
            sender: {
                _id: user._id,
                username: user.username,
                avatar: user.avatar,
            },
        };

        if (Array.isArray(receivers)) {
            receivers.forEach(receiver => {
                io.to(receiver).emit('notification', notificationData);
            });
            console.log(`Notification sent to multiple receivers: ${receivers.join(', ')}`);
        } else {
            io.to(receivers).emit('notification', notificationData);
            console.log(`Notification sent to ${receivers}`);
        }
    } catch (error) {
        console.error('Error sending notification:', error);
    }
}

