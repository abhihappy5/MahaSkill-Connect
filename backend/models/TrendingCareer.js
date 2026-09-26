const mongoose = require('mongoose');

const trendingCareerSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true }, // e.g. "ev-engineer"
    title: { type: String, required: true },
    titleMr: String,
    titleHi: String,
    sector: String,
    sectorKey: { type: String, index: true },
    demandLevel: String,
    growth: String,
    avgSalary: String,
    experienceLevel: String,
    availableCourses: Number,
    openingsMaharashtra: Number,
    requiredSkills: [String],
    topDistricts: [String],
    description: String,
    careerPathway: String,
    govtScheme: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('TrendingCareer', trendingCareerSchema);
