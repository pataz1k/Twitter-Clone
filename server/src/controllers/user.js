const User = require('../models/User');
const Post = require('../models/Post');
const asyncHandler = require('../middlewares/asyncHandler');
const { sendNotification } = require('./notification');

exports.getUsers = asyncHandler(async (req, res, next) => {
  let users = await User.find().select('-password').lean().exec();

  users.forEach((user) => {
    user.isFollowing = false;
    const followers = user.followers.map((follower) => follower._id.toString());
    if (followers.includes(req.user.id)) {
      user.isFollowing = true;
    }
  });

  
  res.status(200).json({ success: true, data: users });
});

exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ username: req.params.username })
    .select('-password')
    .populate({
      path: 'posts',
      select:
        'files tags user retweets retweetCount isLiked likes likesCount comments createdAt caption commentsCount likesCount',
      populate: { path: 'user', select: 'avatar fullname username' },
    })
    .populate({
      path: 'savedPosts',
      select:
        'files tags user retweets retweetCount isLiked likes likesCount comments createdAt caption commentsCount likesCount',
      populate: { path: 'user', select: 'avatar fullname username' },
    })
    .populate({ path: 'followers', select: 'avatar username fullname' })
    .populate({ path: 'following', select: 'avatar username fullname' })
    .lean()
    .exec();

  if (!user) {
    return next({
      message: `The user ${req.params.username} is not found`,
      statusCode: 404,
    });
  }

  user.posts.username = req.params.username;

  user.posts.forEach((post) => {
    post.isLiked = false;
    const likes = post.likes.map((like) => like.toString());
    if (likes.includes(req.user.id)) {
      post.isLiked = true;
    }

    post.isRetweeted = false;
    const retweets = post.retweets && post.retweets.map((retweet) => retweet.toString());
    if (retweets && retweets.includes(req.user.id)) {
      post.isRetweeted = true;
    }
  });

  user.isFollowing = false;
  const followers = user.followers.map((follower) => follower._id.toString());

  user.followers.forEach((follower) => {
    follower.isFollowing = false;
    if (req.user.following.includes(follower._id.toString())) {
      follower.isFollowing = true;
    }
  });

  user.following.forEach((user) => {
    user.isFollowing = false;
    if (req.user.following.includes(user._id.toString())) {
      user.isFollowing = true;
    }
  });

  if (followers.includes(req.user.id)) {
    user.isFollowing = true;
  }

  user.isMe = req.user.id === user._id.toString();

  res.status(200).json({ success: true, data: user });
});
exports.getUserById = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ _id: req.params.id })
    .select('-password')
    .populate({
      path: 'posts',
      select:
        'files tags user retweets retweetCount isLiked likes likesCount comments createdAt caption commentsCount likesCount',
      populate: { path: 'user', select: 'avatar fullname username' },
    })
    .populate({ path: 'savedPosts', select: 'files commentsCount likesCount' })
    .populate({ path: 'followers', select: 'avatar username fullname' })
    .populate({ path: 'following', select: 'avatar username fullname' })
    .lean()
    .exec();

  if (!user) {
    return next({
      message: `The user ${req.params.username} is not found`,
      statusCode: 404,
    });
  }

  user.posts.username = req.params.username;

  user.posts.forEach((post) => {
    post.isLiked = false;
    const likes = post.likes.map((like) => like.toString());
    if (likes.includes(req.user.id)) {
      post.isLiked = true;
    }

    post.isRetweeted = false;
    const retweets = post.retweets && post.retweets.map((retweet) => retweet.toString());
    if (retweets && retweets.includes(req.user.id)) {
      post.isRetweeted = true;
    }
  });

  user.isFollowing = false;
  const followers = user.followers.map((follower) => follower._id.toString());

  user.followers.forEach((follower) => {
    follower.isFollowing = false;
    if (req.user.following.includes(follower._id.toString())) {
      follower.isFollowing = true;
    }
  });

  user.following.forEach((user) => {
    user.isFollowing = false;
    if (req.user.following.includes(user._id.toString())) {
      user.isFollowing = true;
    }
  });

  if (followers.includes(req.user.id)) {
    user.isFollowing = true;
  }

  user.isMe = req.user.id === user._id.toString();

  res.status(200).json({ success: true, data: user });
});

exports.follow = asyncHandler(async (req, res, next) => {
  // make sure the user exists
  const user = await User.findById(req.params.id);

  if (!user) {
    return next({
      message: `No user found for id ${req.params.id}`,
      statusCode: 404,
    });
  }

  // make the sure the user is not the logged in user
  if (req.params.id === req.user.id) {
    return next({ message: "You can't unfollow/follow yourself", status: 400 });
  }

  // only follow if the user is not following already
  if (user.followers.includes(req.user.id)) {
    return next({ message: 'You are already following him', status: 400 });
  }

  await User.findByIdAndUpdate(req.params.id, {
    $push: { followers: req.user.id },
    $inc: { followersCount: 1 },
  });
  await User.findByIdAndUpdate(req.user.id, {
    $push: { following: req.params.id },
    $inc: { followingCount: 1 },
  });

  sendNotification(user._id.toString(),`Now following you!`,req.user.id,`/user/${req.user.username}`)

  res.status(200).json({ success: true, data: {} });
});

exports.unfollow = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next({
      message: `No user found for ID ${req.params.id}`,
      statusCode: 404,
    });
  }

  // make the sure the user is not the logged in user
  if (req.params.id === req.user.id) {
    return next({ message: "You can't follow/unfollow yourself", status: 400 });
  }

  await User.findByIdAndUpdate(req.params.id, {
    $pull: { followers: req.user.id },
    $inc: { followersCount: -1 },
  });
  await User.findByIdAndUpdate(req.user.id, {
    $pull: { following: req.params.id },
    $inc: { followingCount: -1 },
  });

  res.status(200).json({ success: true, data: {} });
});

exports.feed = asyncHandler(async (req, res, next) => {
  const following = req.user.following;

  const users = await User.find()
    .where('_id')
    .in(following.concat([req.user.id]))
    .exec();

  const postIds = users.map((user) => user.posts).flat();

  const posts = await Post.find()
    .populate({
      path: 'comments',
      select: 'text',
      populate: { path: 'user', select: 'avatar fullname username' },
    })
    .populate({ path: 'user', select: 'avatar fullname username' })
    .sort('-createdAt')
    .where('_id')
    .in(postIds)
    .lean()
    .exec();

  posts.forEach((post) => {
    // is the loggedin user liked the post
    post.isLiked = false;
    const likes = post.likes.map((like) => like.toString());
    if (likes.includes(req.user.id)) {
      post.isLiked = true;
    }

    post.isRetweeted = false;
    const retweets = post.retweets && post.retweets.map((retweet) => retweet.toString());
    if (retweets && retweets.includes(req.user.id)) {
      post.isRetweeted = true;
    }

    // is the loggedin saved this post
    post.isSaved = false;
    const savedPosts = req.user.savedPosts.map((post) => post.toString());
    if (savedPosts.includes(post._id)) {
      post.isSaved = true;
    }

    // is the post belongs to the loggedin user
    post.isMine = false;
    if (post.user._id.toString() === req.user.id) {
      post.isMine = true;
    }

    // is the comment belongs to the loggedin user
    post.comments.map((comment) => {
      comment.isCommentMine = false;
      if (comment.user._id.toString() === req.user.id) {
        comment.isCommentMine = true;
      }
    });
  });

  res.status(200).json({ success: true, data: posts });
});

exports.editUser = asyncHandler(async (req, res, next) => {
  const { fullname, bio, settings } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      $set: { fullname, bio, settings },
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({ success: true, data: user });
});

exports.searchUsers = asyncHandler(async (req, res, next) => {
  if (!req.query.username) {
    return next({
      message: 'Please enter either username to search for',
      statusCode: 400,
    });
  }

  let users = [];

  if (req.query.username) {
    const regex = new RegExp(req.query.username, 'i');
    users = await User.find({ username: regex }).select('username avatar _id followersCount');
  }

  res.status(200).json({ success: true, data: users });
});
