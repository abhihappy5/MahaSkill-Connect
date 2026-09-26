const express = require('express');
const {
  getMyProfile,
  updateMyProfile,
  listUsers,
  getUser,
  setUserStatus,
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/profile', protect, getMyProfile);
router.put('/profile', protect, updateMyProfile);

router.get('/', protect, authorize('admin'), listUsers);
router.get('/:id', protect, authorize('admin'), getUser);
router.put('/:id/status', protect, authorize('admin'), setUserStatus);

module.exports = router;
