const mongoose = require('mongoose');

const emergingSkillSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true }, // e.g. "ai"
    title: { type: String, required: true },
    titleMr: String,
    titleHi: String,
    iconName: String,
    growth: String,
    vacancies: String,
    keyFocusAreas: [String],
    targetHubs: [String],
    leadPartners: [String],
    stipendEligibility: String,
    recommendedCertification: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('EmergingSkill', emergingSkillSchema);
