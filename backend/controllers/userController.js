const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const StudentProfile = require('../models/StudentProfile');
const CandidateProfile = require('../models/CandidateProfile');
const RestartProfile = require('../models/RestartProfile');

const profileModelFor = (role) =>
  ({ student: StudentProfile, jobseeker: CandidateProfile, restart: RestartProfile }[role]);

// @desc    Get the logged-in user's role-specific dashboard profile
//          (StudentDashboard / JobSeekerDashboard / CareerRestartDashboard read from this)
// @route   GET /api/users/profile
// @access  Private (student | jobseeker | restart)
const getMyProfile = asyncHandler(async (req, res) => {
  const Model = profileModelFor(req.user.role);
  if (!Model) {
    res.status(400);
    throw new Error('This account role has no extended profile');
  }
  let profile = await Model.findOne({ user: req.user._id }).populate(
    req.user.role === 'student' ? { path: 'enrolledCourses.course', select: 'title provider sector' } : ''
  );
  if (!profile) profile = await Model.create({ user: req.user._id });
  res.status(200).json({ success: true, data: profile });
});

// @desc    Update the logged-in user's role-specific profile (partial update)
// @route   PUT /api/users/profile
// @access  Private (student | jobseeker | restart)
const updateMyProfile = asyncHandler(async (req, res) => {
  const Model = profileModelFor(req.user.role);
  if (!Model) {
    res.status(400);
    throw new Error('This account role has no extended profile');
  }
  const profile = await Model.findOneAndUpdate(
    { user: req.user._id },
    { $set: req.body },
    { new: true, upsert: true, runValidators: true }
  );
  res.status(200).json({ success: true, data: profile });
});

// @desc    List / search users (admin only) - basic pagination + role filter
// @route   GET /api/users?role=student&page=1&limit=20
// @access  Private/Admin
const listUsers = asyncHandler(async (req, res) => {
  const { role, district, search, page = 1, limit = 20 } = req.query;
  const filter = {};
  if (role) filter.role = role;
  if (district) filter.district = district;
  if (search) filter.name = { $regex: search, $options: 'i' };

  const skip = (Number(page) - 1) * Number(limit);
  const [users, total] = await Promise.all([
    User.find(filter).skip(skip).limit(Number(limit)).sort('-createdAt'),
    User.countDocuments(filter),
  ]);

  res.status(200).json({
    success: true,
    count: users.length,
    total,
    page: Number(page),
    pages: Math.ceil(total / Number(limit)),
    data: users,
  });
});

// @desc    Get a single user by id (admin only)
// @route   GET /api/users/:id
// @access  Private/Admin
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  res.status(200).json({ success: true, data: user });
});

// @desc    Activate/deactivate a user account (admin only)
// @route   PUT /api/users/:id/status
// @access  Private/Admin
const setUserStatus = asyncHandler(async (req, res) => {
  const { isActive } = req.body;
  const user = await User.findByIdAndUpdate(req.params.id, { isActive }, { new: true });
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  res.status(200).json({ success: true, data: user });
});

module.exports = { getMyProfile, updateMyProfile, listUsers, getUser, setUserStatus };
