const asyncHandler = require('express-async-handler');
const FaqEntry = require('../models/FaqEntry');
const ChatLog = require('../models/ChatLog');

// Scores each FAQ entry by how many of its keywords appear in the user's message, returns the
// best match. This is a deliberately simple placeholder for the "Ask MahaSkill Connect" /
// UnifiedAiModal assistant — see the README for how to swap this for a real LLM call.
const findBestFaqMatch = (message, entries) => {
  const lower = message.toLowerCase();
  let best = null;
  let bestScore = 0;
  entries.forEach((entry) => {
    const score = entry.keywords.filter((k) => lower.includes(k.toLowerCase())).length;
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  });
  return bestScore > 0 ? best : null;
};

// @desc    Send a message to the assistant and get a reply. Persists the exchange to ChatLog
//          (linked to req.user if logged in, otherwise an anonymous log) so admins can review
//          real questions and grow the FAQ knowledge base over time.
// @route   POST /api/ai/chat   { message, persona, lang, chatLogId? }
// @access  Public (optionalAuth)
const chat = asyncHandler(async (req, res) => {
  const { message, persona = 'student', lang = 'en', chatLogId } = req.body;
  if (!message || !message.trim()) {
    res.status(400);
    throw new Error('Message is required');
  }

  const entries = await FaqEntry.find({ lang });
  const match = findBestFaqMatch(message, entries);
  const reply =
    (match && match.response) ||
    {
      en: "I don't have a specific answer for that yet, but I've logged your question so our team can add it. Try asking about courses, government schemes, stipends, or job eligibility in the meantime.",
      mr: 'याबाबत माझ्याकडे सध्या नेमके उत्तर नाही, पण मी तुमचा प्रश्न नोंदवला आहे. तोपर्यंत तुम्ही अभ्यासक्रम, शासकीय योजना किंवा नोकरीच्या पात्रतेबद्दल विचारू शकता.',
      hi: 'इसका सटीक उत्तर अभी मेरे पास नहीं है, लेकिन मैंने आपका प्रश्न दर्ज कर लिया है। तब तक आप कोर्स, सरकारी योजनाओं या नौकरी की पात्रता के बारे में पूछ सकते हैं।',
    }[lang];

  let log;
  if (chatLogId) {
    log = await ChatLog.findById(chatLogId);
  }
  if (!log) {
    log = await ChatLog.create({ user: req.user ? req.user._id : undefined, persona, lang, messages: [] });
  }
  log.messages.push({ role: 'user', content: message });
  log.messages.push({ role: 'assistant', content: reply });
  await log.save();

  res.status(200).json({ success: true, data: { reply, chatLogId: log._id } });
});

// @desc    Fetch a chat log's full transcript (e.g. to resume a UnifiedAiModal session)
// @route   GET /api/ai/chat/:id
// @access  Public (owner or anonymous - no sensitive data stored)
const getChatLog = asyncHandler(async (req, res) => {
  const log = await ChatLog.findById(req.params.id);
  if (!log) {
    res.status(404);
    throw new Error('Chat log not found');
  }
  res.status(200).json({ success: true, data: log });
});

// @desc    Add/update FAQ knowledge base entries (admin)
// @route   POST /api/ai/faq
// @access  Private/Admin
const createFaqEntry = asyncHandler(async (req, res) => {
  const entry = await FaqEntry.create(req.body);
  res.status(201).json({ success: true, data: entry });
});

module.exports = { chat, getChatLog, createFaqEntry };
