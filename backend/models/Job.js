const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    titleMr: String,
    company: { type: String, required: true },
    companyLogo: String,
    location: String,
    district: { type: String, index: true },
    salary: String,
    experience: String,
    industry: { type: String, index: true },
    workType: String,
    postedDate: { type: Date, default: Date.now },
    applicantsCount: { type: Number, default: 0 },
    isGovtPartner: { type: Boolean, default: false },
    requiredSkills: [String],
    jobDescription: String,
    interviewPreparationTips: String,
    audience: {
      type: [String],
      enum: ['public', 'student', 'jobseeker', 'restart'],
      default: ['public', 'jobseeker'],
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

jobSchema.index({ title: 'text', company: 'text', requiredSkills: 'text' });

// Computes a 0-100 match score + matching/missing skills for a given list of user skills.
// Used by GET /api/jobs/:id/match and by list endpoints when a logged-in user is present.
jobSchema.methods.computeMatch = function computeMatch(userSkillNames = []) {
  const normalized = userSkillNames.map((s) => s.toLowerCase());
  const required = this.requiredSkills || [];
  const matching = required.filter((skill) =>
    normalized.some((u) => skill.toLowerCase().includes(u) || u.includes(skill.toLowerCase()))
  );
  const missing = required.filter((s) => !matching.includes(s));
  const matchScore = required.length ? Math.round((matching.length / required.length) * 100) : 0;
  let matchLevel = 'Needs Upskilling';
  if (matchScore >= 90) matchLevel = 'High Match';
  else if (matchScore >= 75) matchLevel = 'Good Match';
  else if (matchScore >= 50) matchLevel = 'Moderate Match';
  return { matchScore, matchLevel, matchingSkills: matching, missingSkills: missing };
};

module.exports = mongoose.model('Job', jobSchema);
