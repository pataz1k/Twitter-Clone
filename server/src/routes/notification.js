const express = require('express');
const {
  getNotifications,
  getUnreadNotificationCount,
  markAllNotificationsAsRead,
} = require('../controllers/notification');
const { protect } = require('../middlewares/auth');

const router = express.Router();

router.get('/', protect, getNotifications);
router.get('/unread-count', protect, getUnreadNotificationCount);
router.post('/mark-all-read', protect, markAllNotificationsAsRead);

module.exports = router;
