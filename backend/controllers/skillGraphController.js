const asyncHandler = require('express-async-handler');
const SkillGraphEntry = require('../models/SkillGraphEntry');
const { recomputeAndSave, recomputeMany } = require('../utils/skillGapEngine');
const { getUserSkillNames } = require('./jobController');

// @desc    List skill-graph entries (the Skill | Local demand | Available workers table),
//          optionally filtered to one district and/or one occupation.
// @route   GET /api/skill-graph?district=raipur&occupation=Welder
// @access  Public
const getSkillGraph = asyncHandler(async (req, res) => {
  const { district, occupation } = req.query;
  const filter = {};
  if (district) filter.district = district.toLowerCase();
  if (occupation) filter.occupation = new RegExp(`^${occupation}$`, 'i');

  const entries = await SkillGraphEntry.find(filter).sort({ district: 1, gap: -1 });
  res.status(200).json({ success: true, count: entries.length, data: entries });
});

// @desc    Full skill graph for one district — worker supply / job demand / training supply /
//          gap engine output for every occupation tracked there. Feeds the "hyperlocal
//          intelligence" view (district -> demand -> shortage -> nearby training -> pathway).
// @route   GET /api/skill-graph/:district
// @access  Public
const getDistrictSkillGraph = asyncHandler(async (req, res) => {
  const entries = await SkillGraphEntry.find({ district: req.params.district.toLowerCase() }).sort('-gap');
  if (!entries.length) {
    res.status(404);
    throw new Error('No skill-graph data for this district yet');
  }
  const criticalShortages = entries.filter((e) => ['high', 'critical'].includes(e.gapSeverity));
  res.status(200).json({
    success: true,
    district: req.params.district,
    count: entries.length,
    criticalShortageCount: criticalShortages.length,
    data: entries,
  });
});

// @desc    Create/update one (district, occupation) skill-graph row — how government dataset
//          imports (e-Shram, NCS, DGT/ITI, etc.) feed "your data layer". Gap engine is
//          recomputed automatically after every upsert.
// @route   PUT /api/skill-graph/:district/:occupation
//          body: { division?, workerSupply?: {total, breakdown}, jobDemand?: {...}, trainingSupply?: {...} }
// @access  Private/Admin
const upsertSkillGraphEntry = asyncHandler(async (req, res) => {
  const district = req.params.district.toLowerCase();
  const { occupation } = req.params;
  const { division, workerSupply, jobDemand, trainingSupply } = req.body;

  const update = { division };
  if (workerSupply) update.workerSupply = workerSupply;
  if (jobDemand) update.jobDemand = jobDemand;
  if (trainingSupply) update.trainingSupply = trainingSupply;

  let entry = await SkillGraphEntry.findOneAndUpdate(
    { district, occupation },
    update,
    { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
  );
  entry = await recomputeAndSave(entry);

  res.status(200).json({ success: true, data: entry });
});

// @desc    Recompute the skill-gap engine for a district (or everywhere, with no query param) —
//          run this after a batch of upserts (e.g. a fresh govt-dataset import) instead of relying
//          on the per-row recompute in upsertSkillGraphEntry.
// @route   POST /api/skill-graph/recompute?district=raipur
// @access  Private/Admin
const recomputeSkillGaps = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.district) filter.district = req.query.district.toLowerCase();
  const count = await recomputeMany(SkillGraphEntry, filter);
  res.status(200).json({ success: true, message: `Recomputed ${count} skill-graph entries` });
});

// @desc    "Worker advice" view for a district: every tracked occupation ranked by shortage
//          severity, with the nearest training option surfaced for each. When called by a
//          logged-in worker (student/jobseeker/restart), each occupation is also tagged
//          `alreadyQualified` against their stored skills, so the UI can show "you already
//          qualify — apply now" vs "training needed — here's the nearest option".
// @route   GET /api/skill-graph/:district/recommend
// @access  Public (personalized when authenticated)
const recommendForWorker = asyncHandler(async (req, res) => {
  const entries = await SkillGraphEntry.find({ district: req.params.district.toLowerCase() }).sort('-gap');
  if (!entries.length) {
    res.status(404);
    throw new Error('No skill-graph data for this district yet');
  }

  const skillNames = (await getUserSkillNames(req.user)).map((s) => s.toLowerCase());

  const data = entries.map((entry) => {
    const alreadyQualified = skillNames.length
      ? skillNames.some((s) => entry.occupation.toLowerCase().includes(s) || s.includes(entry.occupation.toLowerCase()))
      : undefined;
    const nearestTraining = (entry.trainingSupply?.options || [])
      .slice()
      .sort((a, b) => (a.distanceKm ?? Infinity) - (b.distanceKm ?? Infinity))[0];

    return {
      district: entry.district,
      occupation: entry.occupation,
      gap: entry.gap,
      gapSeverity: entry.gapSeverity,
      demandLevel: entry.jobDemand?.demandLevel,
      recommendedAction: entry.recommendedAction,
      nearestTraining,
      alreadyQualified,
    };
  });

  res.status(200).json({ success: true, count: data.length, data });
});

module.exports = {
  getSkillGraph,
  getDistrictSkillGraph,
  upsertSkillGraphEntry,
  recomputeSkillGaps,
  recommendForWorker,
};
