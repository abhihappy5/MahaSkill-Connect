const express = require('express');
const {
  getSuccessStories,
  createSuccessStory,
  updateSuccessStory,
  deleteSuccessStory,
} = require('../controllers/successStoryController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', getSuccessStories);
router.post('/', protect, authorize('admin'), createSuccessStory);
router.put('/:id', protect, authorize('admin'), updateSuccessStory);
router.delete('/:id', protect, authorize('admin'), deleteSuccessStory);

module.exports = router;
