const mongoose = require('mongoose');

const districtSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, index: true }, // e.g. "pune"
    name: { type: String, required: true },
    nameMr: String,
    nameHi: String,
    division: String,
    demandStatus: { type: String, enum: ['high-demand', 'balanced', 'shortage', 'emerging'] },
    topIndustries: [String],
    topSkills: [String],
    skillShortages: [String],
    currentCapacity: Number,
    estimatedDemand: Number,
    gap: Number,
    placementRate: String,
    employerDemandIndex: String,
    activeITIs: Number,
    privateTrainingPartners: Number,
    recommendedAction: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('District', districtSchema);
