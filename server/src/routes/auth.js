const express = require('express');
const router = express.Router();
const { login, signup, me, checkToken } = require('../controllers/auth');
const { protect } = require('../middlewares/auth');

router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/me').get(protect, me);
router.route('/check-token').get(protect, checkToken);

module.exports = router;
