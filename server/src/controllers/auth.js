const User = require("../models/User");
const asyncHandler = require("../middlewares/asyncHandler");
const path = require("path");

exports.login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next({
      message: "Please provide email and password",
      statusCode: 400,
    });
  }

  const user = await User.findOne({ username });

  if (!user) {
    return next({
      message: "The email is not yet registered to an accout",
      statusCode: 400,
    });
  }

  const match = await user.checkPassword(password);

  if (!match) {
    return next({ message: "The password does not match", statusCode: 400 });
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
      path: "posts",
      populate: {
        path: "user",
        select: "username avatar",
      },
    }) // Заполняем посты
    .populate({
      path: "savedPosts",
      populate: {
        path: "user",
        select: "username avatar",
      },
    }) // Заполняем сохраненные посты
    .exec();

  res.status(200).json({
    success: true,
    data: user, // Теперь user будет содержать объекты постов
  });
});
