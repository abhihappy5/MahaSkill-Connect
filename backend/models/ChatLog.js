const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    role: { type: String, enum: ['user', 'assistant'], required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const chatLogSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // null for anonymous/guest chats
    persona: { type: String, enum: ['student', 'seeker', 'restart', 'admin'], default: 'student' },
    lang: { type: String, enum: ['en', 'mr', 'hi'], default: 'en' },
    messages: [messageSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('ChatLog', chatLogSchema);
