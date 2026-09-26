const asyncHandler = require('express-async-handler');
const Job = require('../models/Job');
const CandidateProfile = require('../models/CandidateProfile');
const StudentProfile = require('../models/StudentProfile');
const RestartProfile = require('../models/RestartProfile');

// Pulls a flat list of skill names for whichever profile type the logged-in user has.
const getUserSkillNames = async (user) => {
  if (!user) return [];
  if (user.role === 'jobseeker') {
    const p = await CandidateProfile.findOne({ user: user._id });
    return p ? p.currentSkills.map((s) => s.name) : [];
  }
  if (user.role === 'student') {
    const p = await StudentProfile.findOne({ user: user._id });
    return p ? p.skillMatrix.map((s) => s.skill) : [];
  }
  if (user.role === 'restart') {
    const p = await RestartProfile.findOne({ user: user._id });
    return p ? p.existingSkills : [];
  }
  return [];
};

// @desc    List/search/filter jobs. If the requester is logged in, each job includes a computed
//          matchScore/matchLevel/matchingSkills/missingSkills against their stored skills —
//          this is what powers the "High / Good / Moderate Match" badges in JobSeekerDashboard.
// @route   GET /api/jobs?district=Pune&industry=EV&audience=jobseeker&search=battery
// @access  Public (personalized when authenticated)
const getJobs = asyncHandler(async (req, res) => {
  const { district, industry, audience, search, page = 1, limit = 12 } = req.query;
  const filter = { isActive: true };
  if (district) filter.district = district;
  if (industry) filter.industry = industry;
  if (audience) filter.audience = audience;
  if (search) filter.$text = { $search: search };

  const skip = (Number(page) - 1) * Number(limit);
  const [jobs, total] = await Promise.all([
    Job.find(filter).skip(skip).limit(Number(limit)).sort('-postedDate'),
    Job.countDocuments(filter),
  ]);

  const skillNames = await getUserSkillNames(req.user);
  const data = jobs.map((job) => {
    const obj = job.toObject();
    if (skillNames.length) Object.assign(obj, job.computeMatch(skillNames));
    return obj;
  });

  res.status(200).json({
    success: true,
    count: data.length,
    total,
    page: Number(page),
    pages: Math.ceil(total / Number(limit)),
    data,
  });
});

// @desc    Get a single job with full eligibility analysis for the logged-in user
// @route   GET /api/jobs/:id
// @access  Public (personalized when authenticated)
const getJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) {
    res.status(404);
    throw new Error('Job not found');
  }
  const skillNames = await getUserSkillNames(req.user);
  const obj = job.toObject();
  if (skillNames.length) Object.assign(obj, job.computeMatch(skillNames));
  res.status(200).json({ success: true, data: obj });
});

// @desc    Create a job posting (admin)
// @route   POST /api/jobs
// @access  Private/Admin
const createJob = asyncHandler(async (req, res) => {
  const job = await Job.create(req.body);
  res.status(201).json({ success: true, data: job });
});

// @desc    Update a job posting (admin)
// @route   PUT /api/jobs/:id
// @access  Private/Admin
const updateJob = asyncHandler(async (req, res) => {
  const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!job) {
    res.status(404);
    throw new Error('Job not found');
  }
  res.status(200).json({ success: true, data: job });
});

// @desc    Delete (soft) a job posting (admin)
// @route   DELETE /api/jobs/:id
// @access  Private/Admin
const deleteJob = asyncHandler(async (req, res) => {
  const job = await Job.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
  if (!job) {
    res.status(404);
    throw new Error('Job not found');
  }
  res.status(200).json({ success: true, message: 'Job deactivated' });
});

module.exports = { getJobs, getJob, createJob, updateJob, deleteJob, getUserSkillNames };
