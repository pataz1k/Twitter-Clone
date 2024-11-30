const User = require('../models/User');
const asyncHandler = require('../middlewares/asyncHandler');
const path = require('path');

exports.login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next({
      message: 'Please provide email and password',
      statusCode: 400,
    });
  }

  const user = await User.findOne({ username });

  if (!user) {
    return next({
      message: 'Incorrect Username',
      statusCode: 400,
    });
  }

  const match = await user.checkPassword(password);

  if (!match) {
    return next({ message: 'The password does not match', statusCode: 400 });
  }
  const token = user.getJwtToken();
  res.status(200).json({ success: true, token });
});

exports.signup = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.create({ username, password });
  const token = user.getJwtToken();

  res.status(201).json({ success: true, token });
});

exports.me = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id)
    .populate({
      path: 'posts',
      populate: {
        path: 'user',
        select: 'username avatar',
      },
    }) // Заполняем посты
    .populate({
      path: 'savedPosts',
      populate: {
        path: 'user',
        select: 'username avatar',
      },
    }) // Заполняем сохраненные посты
    .populate({
      path: 'followers',
      select: 'username avatar _id',
    }) // Заполняем подписки
    .populate({
      path: 'following',
      select: 'username avatar _id',
    }) // Заполняем подписчиков
    .lean()
    .exec();

  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.checkToken = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: 'Token is valid',
  });
});

exports.getUserSettings = asyncHandler(async (req, res, next) => {
  try {
    // req.user уже доступен благодаря middleware protect
    const userSettings = req.user.settings;

    res.status(200).json({
      success: true,
      data: {
        settings: userSettings,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving user settings',
      error: error.message,
    });
  }
});
exports.updateUserSettings = asyncHandler(async (req, res, next) => {
  try {
    const { settings } = req.body;

    if (!settings || typeof settings !== 'object') {
      return res.status(400).json({
        success: false,
        message: 'Invalid settings object',
      });
    }

    // Обновляем только те поля, которые присутствуют в запросе
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: { settings: settings } },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      data: {
        settings: updatedUser.settings,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating user settings',
      error: error.message,
    });
  }
});
