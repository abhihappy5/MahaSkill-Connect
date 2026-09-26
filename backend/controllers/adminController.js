const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Course = require('../models/Course');
const Job = require('../models/Job');
const Application = require('../models/Application');
const District = require('../models/District');
const WorkerRequirement = require('../models/WorkerRequirement');
const SkillGraphEntry = require('../models/SkillGraphEntry');

// @desc    Top-line admin KPIs. Placement rate / employer satisfaction are computed live from
//          Application + Course data; the rest (skill shortage counts, capacity gap) come from
//          the seeded District intelligence collection until a live labour-survey feed exists.
// @route   GET /api/admin/kpis
// @access  Private/Admin
const getKpis = asyncHandler(async (req, res) => {
  const [
    totalUsers, totalCourses, totalJobs, selectedApps, totalApps, districts,
    openRequirements, totalWorkersRequested, skillGraphEntries,
  ] = await Promise.all([
    User.countDocuments(),
    Course.countDocuments({ isActive: true }),
    Job.countDocuments({ isActive: true }),
    Application.countDocuments({ status: 'Selected' }),
    Application.countDocuments(),
    District.find(),
    WorkerRequirement.countDocuments({ status: 'open' }),
    WorkerRequirement.aggregate([{ $group: { _id: null, total: { $sum: '$requiredWorkers' } } }]),
    SkillGraphEntry.find(),
  ]);

  const placementRate = totalApps ? Math.round((selectedApps / totalApps) * 1000) / 10 : 0;
  const capacityGap = districts.reduce((sum, d) => sum + (d.gap || 0), 0);
  const criticalShortageDistricts = districts.filter((d) => d.demandStatus === 'shortage').length;
  const criticalSkillShortages = skillGraphEntries.filter((e) => ['high', 'critical'].includes(e.gapSeverity)).length;

  res.status(200).json({
    success: true,
    data: {
      totalUsers,
      totalCourses,
      totalJobs,
      totalApplications: totalApps,
      selectedApplications: selectedApps,
      placementRate: `${placementRate}%`,
      trainingCapacityGap: capacityGap,
      districtsInShortage: criticalShortageDistricts,
      districtsTracked: districts.length,
      // Employer/worker-requirement + skill-graph KPIs — the "govt dashboard" output of the
      // skill gap engine (worker supply vs job demand vs training supply, by district×skill).
      openWorkerRequirements: openRequirements,
      totalWorkersRequested: totalWorkersRequested[0]?.total || 0,
      skillOccupationsTracked: skillGraphEntries.length,
      criticalSkillShortages,
    },
  });
});

// @desc    Full district intelligence table (admin DistrictIntelligence view)
// @route   GET /api/admin/district-intelligence
// @access  Private/Admin
const getDistrictIntelligence = asyncHandler(async (req, res) => {
  const districts = await District.find().sort('-gap');
  res.status(200).json({ success: true, count: districts.length, data: districts });
});

// @desc    Applications funnel breakdown by stage, for admin charts
// @route   GET /api/admin/applications-funnel
// @access  Private/Admin
const getApplicationsFunnel = asyncHandler(async (req, res) => {
  const pipeline = await Application.aggregate([
    { $group: { _id: '$status', count: { $sum: 1 } } },
    { $sort: { _id: 1 } },
  ]);
  res.status(200).json({ success: true, data: pipeline });
});

// @desc    User growth / role breakdown, for admin charts
// @route   GET /api/admin/user-breakdown
// @access  Private/Admin
const getUserBreakdown = asyncHandler(async (req, res) => {
  const pipeline = await User.aggregate([{ $group: { _id: '$role', count: { $sum: 1 } } }]);
  res.status(200).json({ success: true, data: pipeline });
});

module.exports = { getKpis, getDistrictIntelligence, getApplicationsFunnel, getUserBreakdown };
