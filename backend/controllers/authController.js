const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const StudentProfile = require('../models/StudentProfile');
const CandidateProfile = require('../models/CandidateProfile');
const RestartProfile = require('../models/RestartProfile');
const EmployerProfile = require('../models/EmployerProfile');
const { sendTokenResponse } = require('../utils/generateToken');

// @desc    Register a new user (student | jobseeker | restart | employer). Admin accounts are
//          seeded/created directly in the DB, not through public signup.
// @route   POST /api/auth/register
// @access  Public
const register = asyncHandler(async (req, res) => {
  const { name, email, password, phone, role, district, preferredLang } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Name, email and password are required');
  }
  if (role === 'admin') {
    res.status(403);
    throw new Error('Admin accounts cannot be self-registered');
  }

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    res.status(400);
    throw new Error('An account with this email already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
    phone,
    role: role || 'jobseeker',
    district,
    preferredLang,
    avatar: name
      .split(' ')
      .map((p) => p[0])
      .join('')
      .slice(0, 2)
      .toUpperCase(),
  });

  // Auto-create the matching empty role profile so dashboard reads never 404 for a brand-new user.
  if (user.role === 'student') await StudentProfile.create({ user: user._id });
  if (user.role === 'jobseeker') await CandidateProfile.create({ user: user._id });
  if (user.role === 'restart') await RestartProfile.create({ user: user._id });
  if (user.role === 'employer') {
    await EmployerProfile.create({ user: user._id, district: user.district });
  }

  sendTokenResponse(user, 201, res);
});

// @desc    Login with email + password
// @route   POST /api/auth/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error('Email and password are required');
  }

  const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error('Invalid email or password');
  }
  if (!user.isActive) {
    res.status(403);
    throw new Error('This account has been deactivated');
  }

  user.lastLoginAt = new Date();
  await user.save();

  sendTokenResponse(user, 200, res);
});

// @desc    Logout - clears the auth cookie (JWT itself remains valid until expiry for API clients)
// @route   POST /api/auth/logout
// @access  Private
const logout = asyncHandler(async (req, res) => {
  res.cookie('token', 'none', { httpOnly: true, expires: new Date(Date.now() + 5 * 1000) });
  res.status(200).json({ success: true, message: 'Logged out' });
});

// @desc    Get the currently logged-in user
// @route   GET /api/auth/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({ success: true, data: req.user });
});

// @desc    Update own basic account fields (name, phone, district, language, avatar)
// @route   PUT /api/auth/me
// @access  Private
const updateMe = asyncHandler(async (req, res) => {
  const allowed = ['name', 'phone', 'district', 'preferredLang', 'avatar'];
  const updates = {};
  allowed.forEach((field) => {
    if (req.body[field] !== undefined) updates[field] = req.body[field];
  });

  const user = await User.findByIdAndUpdate(req.user._id, updates, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ success: true, data: user });
});

// @desc    Change password
// @route   PUT /api/auth/password
// @access  Private
const updatePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const user = await User.findById(req.user._id).select('+password');

  if (!(await user.matchPassword(currentPassword))) {
    res.status(401);
    throw new Error('Current password is incorrect');
  }
  user.password = newPassword;
  await user.save();

  sendTokenResponse(user, 200, res);
});

module.exports = { register, login, logout, getMe, updateMe, updatePassword };
