const asyncHandler = require('express-async-handler');
const TrendingCareer = require('../models/TrendingCareer');
const EmergingSkill = require('../models/EmergingSkill');

// @desc    List trending careers (TrendingCareers homepage section)
// @route   GET /api/careers/trending?sector=it&search=ai
// @access  Public
const getTrendingCareers = asyncHandler(async (req, res) => {
  const { sector, search } = req.query;
  const filter = {};
  if (sector) filter.sectorKey = sector;
  if (search) filter.$or = [{ title: new RegExp(search, 'i') }, { requiredSkills: new RegExp(search, 'i') }];
  const careers = await TrendingCareer.find(filter).sort('-openingsMaharashtra');
  res.status(200).json({ success: true, count: careers.length, data: careers });
});

// @desc    Get one trending career by slug
// @route   GET /api/careers/trending/:slug
// @access  Public
const getTrendingCareer = asyncHandler(async (req, res) => {
  const career = await TrendingCareer.findOne({ slug: req.params.slug });
  if (!career) {
    res.status(404);
    throw new Error('Career not found');
  }
  res.status(200).json({ success: true, data: career });
});

// @desc    List emerging skill clusters (EmergingSkills homepage section)
// @route   GET /api/careers/emerging-skills
// @access  Public
const getEmergingSkills = asyncHandler(async (req, res) => {
  const skills = await EmergingSkill.find().sort('-createdAt');
  res.status(200).json({ success: true, count: skills.length, data: skills });
});

// @desc    Create/update a trending career (admin)
// @route   PUT /api/careers/trending/:slug
// @access  Private/Admin
const upsertTrendingCareer = asyncHandler(async (req, res) => {
  const career = await TrendingCareer.findOneAndUpdate({ slug: req.params.slug }, req.body, {
    new: true,
    upsert: true,
    runValidators: true,
  });
  res.status(200).json({ success: true, data: career });
});

module.exports = { getTrendingCareers, getTrendingCareer, getEmergingSkills, upsertTrendingCareer };
