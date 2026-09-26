const mongoose = require('mongoose');

const restartProfileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    currentSituation: String, // e.g. gap reason/duration
    previousRole: String,
    previousIndustry: String,
    education: String,
    preferredLocation: String,
    preferredIndustry: String,
    careerGoal: String,
    careerReadinessScore: { type: Number, min: 0, max: 100, default: 0 },
    readinessMetrics: {
      existingSkillsScore: Number,
      transferableSkillsScore: Number,
      skillsToImproveScore: Number,
      overallJobReadiness: Number,
    },
    existingSkills: [String],
    learningPath: [
      {
        step: Number,
        title: String,
        duration: String,
        provider: String,
        description: String,
        status: { type: String, enum: ['completed', 'in-progress', 'upcoming'], default: 'upcoming' },
        currentProgress: Number,
        subsidy: String,
        skillsGained: [String],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('RestartProfile', restartProfileSchema);
