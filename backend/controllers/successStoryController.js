const asyncHandler = require('express-async-handler');
const SuccessStory = require('../models/SuccessStory');

// @desc    List published success stories (SuccessStories homepage section)
// @route   GET /api/success-stories?category=Reskill
// @access  Public
const getSuccessStories = asyncHandler(async (req, res) => {
  const { category, district } = req.query;
  const filter = { isPublished: true };
  if (category) filter.category = category;
  if (district) filter.district = district;
  const stories = await SuccessStory.find(filter).sort('-createdAt');
  res.status(200).json({ success: true, count: stories.length, data: stories });
});

// @desc    Create a success story (admin)
// @route   POST /api/success-stories
// @access  Private/Admin
const createSuccessStory = asyncHandler(async (req, res) => {
  const story = await SuccessStory.create(req.body);
  res.status(201).json({ success: true, data: story });
});

// @desc    Update a success story (admin)
// @route   PUT /api/success-stories/:id
// @access  Private/Admin
const updateSuccessStory = asyncHandler(async (req, res) => {
  const story = await SuccessStory.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!story) {
    res.status(404);
    throw new Error('Success story not found');
  }
  res.status(200).json({ success: true, data: story });
});

// @desc    Unpublish (soft delete) a success story (admin)
// @route   DELETE /api/success-stories/:id
// @access  Private/Admin
const deleteSuccessStory = asyncHandler(async (req, res) => {
  const story = await SuccessStory.findByIdAndUpdate(req.params.id, { isPublished: false }, { new: true });
  if (!story) {
    res.status(404);
    throw new Error('Success story not found');
  }
  res.status(200).json({ success: true, message: 'Success story unpublished' });
});

module.exports = { getSuccessStories, createSuccessStory, updateSuccessStory, deleteSuccessStory };
