const mongoose = require('mongoose');

// One row of the "district-wise skill graph" described in the project brief:
//   GOVERNMENT DATA -> e-Shram/PLFS/Census (worker supply), NCS/EPFO/DSDP (job demand),
//   DGT/Skill India/PMKVY (training supply) -> YOUR DATA LAYER -> SKILL GAP ENGINE.
// Each entry is one (district, occupation) pair, e.g. { district: "raipur", occupation: "Welder" }.
const GOVT_SOURCES = [
  'e-Shram', 'PLFS', 'NCS', 'EPFO', 'UDISE+', 'DGT/ITI', 'Skill India Digital Hub',
  'Apprenticeship India/NAPS', 'State Skill Development Mission', 'District Skill Development Plan',
  'State Skill Gap Report', 'Census', 'GST/Business Data', 'Admin/Manual',
];

const sourcedCountSchema = new mongoose.Schema(
  {
    source: { type: String, enum: GOVT_SOURCES, required: true },
    value: { type: Number, required: true, min: 0 },
    asOf: Date, // vintage of the dataset this figure came from
  },
  { _id: false }
);

const trainingOptionSchema = new mongoose.Schema(
  {
    source: { type: String, enum: GOVT_SOURCES, required: true },
    institute: String, // e.g. "Govt ITI Raipur"
    courseName: String,
    durationMonths: Number,
    seatsAvailable: Number,
    distanceKm: Number,
    hasApprenticeship: { type: Boolean, default: false },
  },
  { _id: false }
);

const skillGraphEntrySchema = new mongoose.Schema(
  {
    district: { type: String, required: true, trim: true, index: true },
    division: String,
    occupation: { type: String, required: true, trim: true, index: true },

    // Worker supply — "what kind of workforce exists here?" (e-Shram/PLFS/Census/UDISE+)
    workerSupply: {
      total: { type: Number, default: 0 },
      breakdown: [sourcedCountSchema],
    },
    // Job demand — "what are employers actually looking for?" (NCS/EPFO/DSDP/State Skill Gap Report)
    jobDemand: {
      total: { type: Number, default: 0 },
      demandLevel: { type: String, enum: ['low', 'medium', 'high', 'very-high'] },
      breakdown: [sourcedCountSchema],
    },
    // Training supply — "can we actually train this person for the missing skill?" (DGT/ITI, Skill India, PMKVY, NAPS)
    trainingSupply: {
      totalSeats: { type: Number, default: 0 },
      options: [trainingOptionSchema],
    },

    // --- Skill Gap Engine output (recomputed by utils/skillGapEngine.js) ---
    gap: { type: Number, default: 0 }, // jobDemand.total - workerSupply.total, floor 0
    gapSeverity: { type: String, enum: ['none', 'low', 'moderate', 'high', 'critical'], default: 'none' },
    recommendedAction: String,

    lastComputedAt: Date,
  },
  { timestamps: true }
);

skillGraphEntrySchema.index({ district: 1, occupation: 1 }, { unique: true });

module.exports = mongoose.model('SkillGraphEntry', skillGraphEntrySchema);
module.exports.GOVT_SOURCES = GOVT_SOURCES;
