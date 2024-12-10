const { getIO } = require('../socketManager');
const User = require('../models/User');
const Notification = require('../models/Notification');

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
      for (const receiver of receivers) {
        await saveNotification(receiver.toString(), senderId, message);
        io.to(receiver.toString()).emit('notification', notificationData);
      }
      console.log(`Notification sent to multiple receivers: ${receivers.join(', ')}`);
    } else {
      await saveNotification(receivers, senderId, message);
      io.to(receivers).emit('notification', notificationData);
      console.log(`Notification sent to ${receivers}`);
    }
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};

async function saveNotification(receiver, sender, message) {
  const notification = new Notification({
    receiver,
    sender,
    message,
  });
  await notification.save();
}

exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ receiver: req.user._id })
      .sort('-createdAt')
      .populate('sender', 'username avatar');

    res.status(200).json({
      success: true,
      data: notifications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving notifications',
      error: error.message,
    });
  }
};

exports.getUnreadNotificationCount = async (req, res) => {
  try {
    const count = await Notification.countDocuments({ receiver: req.user._id, read: false });

    res.status(200).json({
      success: true,
      count: count,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving unread notification count',
      error: error.message,
    });
  }
};

exports.markAllNotificationsAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { receiver: req.user._id, read: false },
      { $set: { read: true } }
    );

    res.status(200).json({
      success: true,
      message: 'All notifications marked as read',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error marking notifications as read',
      error: error.message,
    });
  }
};
