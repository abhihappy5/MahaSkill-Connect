const mongoose = require('mongoose');

// Lightweight keyword-matched knowledge base backing the "Ask MahaSkill Connect" assistant
// before/alongside a real LLM integration (see aiController.js notes).
const faqEntrySchema = new mongoose.Schema(
  {
    lang: { type: String, enum: ['en', 'mr', 'hi'], default: 'en', index: true },
    keywords: { type: [String], index: true },
    response: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('FaqEntry', faqEntrySchema);
