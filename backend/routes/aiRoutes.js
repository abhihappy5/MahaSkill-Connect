const express = require('express');
const { chat, getChatLog, createFaqEntry } = require('../controllers/aiController');
const { protect, authorize, optionalAuth } = require('../middleware/auth');

const router = express.Router();

router.post('/chat', optionalAuth, chat);
router.get('/chat/:id', getChatLog);
router.post('/faq', protect, authorize('admin'), createFaqEntry);

module.exports = router;
