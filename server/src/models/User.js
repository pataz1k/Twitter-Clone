const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: false,
  },
  fullname: {
    type: String,
    required: false,
    default: '',
  },
  username: {
    type: String,
    required: [true, 'Please enter your username'],
    trim: true,
    index: true,
    unique: true,
    sparse: true,
  },

  password: {
    type: String,
    required: [true, 'Please enter your password'],
    minlength: [6, 'Password should be atleast minimum of 6 characters'],
    validate(value) {
      if (value.length < 6) {
        throw new Error('Password should be atleast minimum of 6 characters');
      }
    },
  },
  avatar: {
    type: String,
    default:
      'https://res.cloudinary.com/dii9edh0l/image/upload/v1720421982/wvinzao4ouvil6sauxxo.png',
  },
  bio: {
    type: String,
    default: '',
  },
  website: {
    type: String,
    default: '',
  },
  followers: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  followersCount: {
    type: Number,
    default: 0,
  },
  followingCount: {
    type: Number,
    default: 0,
  },
  following: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  posts: [{ type: mongoose.Schema.ObjectId, ref: 'Post' }],
  postCount: {
    type: Number,
    default: 0,
  },
  savedPosts: [{ type: mongoose.Schema.ObjectId, ref: 'Post' }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  settings: {
    banner: {
      first: {
        type: String,
        default:
          'linear-gradient(90deg, rgba(98,135,179,1) 0%, rgba(50,130,189,1) 51%, rgba(0,212,255,1) 100%)',
        required: true,
      },
      second: {
        type: String,
        default:
          'linear-gradient(90deg, rgba(0,212,255,1) 0%, rgba(98,135,179,1) 51%, rgba(50,130,189,1) 100%)',
        required: true,
      },
      third: {
        type: String,
        default:
          'linear-gradient(90deg, rgba(50,130,189,1) 0%, rgba(0,212,255,1) 51%, rgba(98,135,179,1) 100%)',
        required: true,
      },
    },
  },
});

UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id, username: this.username }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

UserSchema.methods.checkPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
