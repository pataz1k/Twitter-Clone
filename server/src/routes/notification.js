const express = require('express');
const {
  getNotifications,
  getUnreadNotificationCount,
  markAllNotificationsAsRead,
  markAsReadById,
} = require('../controllers/notification');
const { protect } = require('../middlewares/auth');

const router = express.Router();

router.get('/', protect, getNotifications);
router.get('/unread-count', protect, getUnreadNotificationCount);
router.get('/mark-all-read', protect, markAllNotificationsAsRead);
router.get('/mark-as-read/:id',protect,markAsReadById)

module.exports = router;
