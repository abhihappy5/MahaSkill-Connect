const mongoose = require('mongoose');

const currentSkillSchema = new mongoose.Schema(
  {
    name: String,
    level: { type: Number, min: 0, max: 100 },
    status: { type: String, enum: ['verified', 'in-progress', 'missing'], default: 'in-progress' },
  },
  { _id: false }
);

const candidateProfileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    title: String, // current/target job title
    division: String,
    education: String,
    experienceYears: { type: Number, default: 0 },
    profileCompleteness: { type: Number, min: 0, max: 100, default: 0 },
    resumeCompleteness: { type: Number, min: 0, max: 100, default: 0 },
    topSkillMatchScore: { type: Number, min: 0, max: 100 },
    currentSkills: [currentSkillSchema],
    preferredLocations: [String],
    desiredSalary: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('CandidateProfile', candidateProfileSchema);
