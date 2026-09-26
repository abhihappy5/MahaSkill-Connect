const asyncHandler = require('express-async-handler');
const Application = require('../models/Application');
const Job = require('../models/Job');

// @desc    Apply to a job
// @route   POST /api/applications  { jobId }
// @access  Private
const applyToJob = asyncHandler(async (req, res) => {
  const { jobId } = req.body;
  const job = await Job.findById(jobId);
  if (!job || !job.isActive) {
    res.status(404);
    throw new Error('Job not found or no longer active');
  }

  const existing = await Application.findOne({ user: req.user._id, job: jobId });
  if (existing) {
    res.status(400);
    throw new Error('You have already applied to this job');
  }

  const application = await Application.create({ user: req.user._id, job: jobId });
  job.applicantsCount += 1;
  await job.save();

  res.status(201).json({ success: true, data: application });
});

// @desc    Get the logged-in user's applications (drives the "My Applications" tracker)
// @route   GET /api/applications/me
// @access  Private
const getMyApplications = asyncHandler(async (req, res) => {
  const applications = await Application.find({ user: req.user._id })
    .populate('job', 'title company location salary industry')
    .sort('-appliedDate');
  res.status(200).json({ success: true, count: applications.length, data: applications });
});

// @desc    Withdraw an application
// @route   DELETE /api/applications/:id
// @access  Private
const withdrawApplication = asyncHandler(async (req, res) => {
  const application = await Application.findOne({ _id: req.params.id, user: req.user._id });
  if (!application) {
    res.status(404);
    throw new Error('Application not found');
  }
  await application.deleteOne();
  res.status(200).json({ success: true, message: 'Application withdrawn' });
});

// @desc    List applications for a job, or all applications (admin/recruiter view)
// @route   GET /api/applications?jobId=&status=
// @access  Private/Admin
const getApplications = asyncHandler(async (req, res) => {
  const { jobId, status, page = 1, limit = 20 } = req.query;
  const filter = {};
  if (jobId) filter.job = jobId;
  if (status) filter.status = status;

  const skip = (Number(page) - 1) * Number(limit);
  const [applications, total] = await Promise.all([
    Application.find(filter)
      .populate('user', 'name email district')
      .populate('job', 'title company')
      .skip(skip)
      .limit(Number(limit))
      .sort('-appliedDate'),
    Application.countDocuments(filter),
  ]);

  res.status(200).json({
    success: true,
    count: applications.length,
    total,
    page: Number(page),
    pages: Math.ceil(total / Number(limit)),
    data: applications,
  });
});

// @desc    Update an application's stage/status (admin/recruiter)
// @route   PUT /api/applications/:id/status  { status, interviewDate, interviewMode, recruiterNote }
// @access  Private/Admin
const STAGE_INDEX = { Applied: 1, Shortlisted: 2, Interview: 3, Selected: 4, Rejected: 5 };
const updateApplicationStatus = asyncHandler(async (req, res) => {
  const { status, interviewDate, interviewMode, recruiterNote } = req.body;
  const update = { ...(status && { status, stageIndex: STAGE_INDEX[status] }) };
  if (interviewDate !== undefined) update.interviewDate = interviewDate;
  if (interviewMode !== undefined) update.interviewMode = interviewMode;
  if (recruiterNote !== undefined) update.recruiterNote = recruiterNote;

  const application = await Application.findByIdAndUpdate(req.params.id, update, {
    new: true,
    runValidators: true,
  });
  if (!application) {
    res.status(404);
    throw new Error('Application not found');
  }
  res.status(200).json({ success: true, data: application });
});

module.exports = {
  applyToJob,
  getMyApplications,
  withdrawApplication,
  getApplications,
  updateApplicationStatus,
};
