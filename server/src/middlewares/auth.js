const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Предполагается, что у вас есть модель User

exports.protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.',
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Дополнительная проверка срока действия токена
    if (Date.now() >= decoded.exp * 1000) {
      return res.status(401).json({
        success: false,
        message: 'Token has expired.',
      });
    }

    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: `No user found for ID ${decoded.id}`,
      });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token.',
      });
    }

    res.status(500).json({
      success: false,
      message: 'An error occurred while authenticating user.',
    });
  }
};
