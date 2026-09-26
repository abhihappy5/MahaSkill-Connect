const asyncHandler = require('express-async-handler');
const District = require('../models/District');

// @desc    List all districts (SkillDemandMap on the homepage, and admin filters)
// @route   GET /api/districts?division=Pune&demandStatus=high-demand
// @access  Public
const getDistricts = asyncHandler(async (req, res) => {
  const { division, demandStatus } = req.query;
  const filter = {};
  if (division) filter.division = division;
  if (demandStatus) filter.demandStatus = demandStatus;
  const districts = await District.find(filter).sort('name');
  res.status(200).json({ success: true, count: districts.length, data: districts });
});

// @desc    Get one district's full intelligence block
// @route   GET /api/districts/:key
// @access  Public
const getDistrict = asyncHandler(async (req, res) => {
  const district = await District.findOne({ key: req.params.key });
  if (!district) {
    res.status(404);
    throw new Error('District not found');
  }
  res.status(200).json({ success: true, data: district });
});

// @desc    Create or update a district's intelligence data (admin — usually a periodic data refresh)
// @route   PUT /api/districts/:key
// @access  Private/Admin
const upsertDistrict = asyncHandler(async (req, res) => {
  const district = await District.findOneAndUpdate({ key: req.params.key }, req.body, {
    new: true,
    upsert: true,
    runValidators: true,
  });
  res.status(200).json({ success: true, data: district });
});

module.exports = { getDistricts, getDistrict, upsertDistrict };
