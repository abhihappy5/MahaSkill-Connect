const mongoose = require('mongoose');

// One row = one ITI/DVET occupation whose current syllabus has fallen behind what industry
// audits say the trade now requires. Powers the admin "Curriculum Alignment" page
// (CurriculumGapDetector.jsx) — industryRequired vs currentCurriculum vs missingCompetencies,
// plus the "Recommend Curriculum Update" action which used to be a client-only alert().
const curriculumGapSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, index: true }, // e.g. "gap-ev" (was `id` in the frontend mock data)
    occupation: { type: String, required: true },
    industryRequired: [String],
    currentCurriculum: [String],
    missingCompetencies: [String],
    evidenceCitation: String,
    urgency: String,

    // Memo / board-resolution workflow state, replacing the old fake alert() text.
    memoAction: String, // human-readable free text description (kept for parity with seed data)
    memoStatus: {
      type: String,
      enum: ['not_started', 'queued', 'submitted', 'approved', 'rejected'],
      default: 'not_started',
    },
    memoQueuedAt: Date,
    memoQueuedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    memoHistory: [
      {
        status: String,
        note: String,
        at: { type: Date, default: Date.now },
        by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('CurriculumGap', curriculumGapSchema);