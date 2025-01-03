const mongoose = require('mongoose');
const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');
const asyncHandler = require('../middlewares/asyncHandler');
const { sendNotification } = require('./notification');
const { getPostLink } = require('../utils/link');

exports.getTags = asyncHandler(async (req, res, next) => {
  const tags = await Post.find().distinct('tags');

  const tagCounts = await Promise.all(
    tags.map(async (tag) => {
      const count = await Post.countDocuments({ tags: tag });
      return { tag, count };
    })
  );

  res.status(200).json({ success: true, data: tagCounts });
});

exports.getPostByTag = asyncHandler(async (req, res, next) => {
  console.log('Tag', req.params.tag);
  if (req.params.tag) {
    const posts = await Post.find({ tags: `#${req.params.tag}` }).populate({
      path: 'user',
      select: 'username avatar',
    });
  ;
    console.log(posts.length);
    if (posts.length === 0) {
      res.status(404).json({ success: false, message: 'No posts found' });
    } else {
      res.status(200).json({ success: true, data: posts });
    }
  } else {
    res.status(400).json({ success: false, message: 'No tag provided' });
  }
});

exports.getPosts = asyncHandler(async (req, res, next) => {
  const posts = await Post.find().populate({
    path: 'user',
    select: 'username avatar',
  });

  res.status(200).json({ success: true, data: posts });
});

exports.getPost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id)
    .populate({
      path: 'comments',
      select: 'text createdAt',
      populate: {
        path: 'user',
        select: 'username avatar',
      },
    })
    .populate({
      path: 'user',
      select: 'username avatar createdAt',
    })
    .lean()
    .exec();

  if (!post) {
    return next({
      message: `No post found for id ${req.params.id}`,
      statusCode: 404,
    });
  }

  post.isMine = req.user.id === post.user._id.toString();

  const likes = post.likes.map((like) => like.toString());
  post.isLiked = likes.includes(req.user.id);

  const retweets = post.retweets && post.retweets.map((retweet) => retweet.toString());
  post.isRetweeted = retweets && retweets.includes(req.user.id);

  post.comments.forEach((comment) => {
    comment.isCommentMine = false;

    const userStr = comment.user._id.toString();
    if (userStr === req.user.id) {
      comment.isCommentMine = true;
    }
  });

  res.status(200).json({ success: true, data: post });
});

exports.addPost = asyncHandler(async (req, res, next) => {
  const { caption, files, tags } = req.body;
  const user = req.user.id;

  let post = await Post.create({ caption, files, tags, user });

  await User.findByIdAndUpdate(req.user.id, {
    $push: { posts: post._id },
    $inc: { postCount: 1 },
  });
  post = await post.populate({ path: 'user', select: 'avatar username fullname' }).execPopulate();

  // Fetch the user's followers
  const userWithFollowers = await User.findById(req.user.id).select('followers');

  // Send notification to all followers
  if (userWithFollowers.followers.length > 0) {
    await sendNotification(
      userWithFollowers.followers,
      `${req.user.username} has created a new post`,
      req.user.id,
      getPostLink(post._id)
    );
  }

  res
    .status(200)
    .json({ success: true, data: post, notificationSent: userWithFollowers.followers.length > 0 });
});

exports.toggleLike = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next({
      message: `No post found for id ${req.params.id}`,
      statusCode: 404,
    });
  }

  if (post.likes.includes(req.user.id)) {
    const index = post.likes.indexOf(req.user.id);
    post.likes.splice(index, 1);
    post.likesCount = post.likesCount - 1;
    await post.save();
  } else {
    post.likes.push(req.user.id);
    post.likesCount = post.likesCount + 1;
    await post.save();

    // Отправляем уведомление только при добавлении лайка
    const postOwner = await User.findById(post.user);
    if (postOwner._id.toString() !== req.user.id) {
      await sendNotification(
        postOwner._id.toString(),
        `${req.user.username} liked your post`,
        req.user.id,
        getPostLink(post._id)
      );
    }
  }

  res.status(200).json({ success: true, data: {} });
});

exports.toggleRetweet = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next({
      message: `No post found for id ${req.params.id}`,
      statusCode: 404,
    });
  }

  if (post.retweets.includes(req.user.id)) {
    const index = post.retweets.indexOf(req.user.id);
    post.retweets.splice(index, 1);
    post.retweetCount = post.retweetCount - 1;

    await post.save();

    await User.findByIdAndUpdate(req.user.id, {
      $pull: { savedPosts: req.params.id },
    });
  } else {
    post.retweets.push(req.user.id);
    post.retweetCount = post.retweetCount + 1;

    await post.save();

    await User.findByIdAndUpdate(req.user.id, {
      $push: { savedPosts: post._id },
    });
  }

  res.status(200).json({ success: true, data: {} });
});

exports.addComment = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next({
      message: `No post found for id ${req.params.id}`,
      statusCode: 404,
    });
  }

  let comment = await Comment.create({
    user: req.user.id,
    post: req.params.id,
    text: req.body.text,
  });

  post.comments.push(comment._id);
  post.commentsCount = post.commentsCount + 1;
  await post.save();

  comment = await comment
    .populate({ path: 'user', select: 'avatar username fullname' })
    .execPopulate();

  res.status(200).json({ success: true, data: comment });
});

exports.searchPost = asyncHandler(async (req, res, next) => {
  if (!req.query.caption && !req.query.tag) {
    return next({
      message: 'Please enter either caption or tag to search for',
      statusCode: 400,
    });
  }

  let posts = [];

  if (req.query.caption) {
    const regex = new RegExp(req.query.caption, 'i');
    posts = await Post.find({ caption: regex });
  }

  if (req.query.tag) {
    posts = posts.concat([await Post.find({ tags: req.query.tag })]);
  }

  res.status(200).json({ success: true, data: posts });
});
