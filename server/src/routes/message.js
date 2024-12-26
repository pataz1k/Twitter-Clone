const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const { protect } = require('../middlewares/auth');

// Get all dialogs for the user
router.get('/dialogs', protect, async (req, res) => {
  try {
    const accountId = req.user._id;
    const dialogs = await Message.aggregate([
      {
        $match: {
          $or: [{ sender: accountId }, { receiver: accountId }],
        },
      },
      {
        $sort: { timestamp: -1 },
      },
      {
        $group: {
          _id: {
            $cond: [{ $eq: ['$sender', accountId] }, '$receiver', '$sender'],
          },
          lastMessage: { $first: '$$ROOT' },
        },
      },
      {
        $lookup: {
          from: 'users', // Предполагаем, что коллекция пользователей называется 'users'
          localField: '_id',
          foreignField: '_id',
          as: 'chatMember',
        },
      },
      {
        $unwind: '$chatMember',
      },
      {
        $project: {
          _id: 0,
          chatMember: {
            _id: '$chatMember._id',
            avatar: '$chatMember.avatar',
            username: '$chatMember.username',
          },
          lastMessage: 1,
        },
      },
    ]);
    res.json(dialogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get messages between two users
router.get('/:userId', protect, async (req, res) => {
  const accountId = req.user._id;
  try {
    const messages = await Message.find({
      $or: [
        { sender: accountId, receiver: req.params.userId },
        { sender: req.params.userId, receiver: accountId },
      ],
    }).sort('timestamp');
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Save a new message
router.post('/', async (req, res) => {
  const message = new Message({
    sender: req.accountId,
    receiver: req.body.receiver,
    message: req.body.message,
  });

  try {
    const newMessage = await message.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
