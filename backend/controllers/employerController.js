const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const EmployerProfile = require('../models/EmployerProfile');
const WorkerRequirement = require('../models/WorkerRequirement');
const { parseWorkerRequirement } = require('../utils/parseWorkerRequirement');
const { scoreWorkerMatch } = require('../utils/matchWorkers');
const { getUserSkillNames } = require('./jobController');

// @desc    Get the logged-in employer's company profile
// @route   GET /api/employer/profile
// @access  Private/Employer
const getMyProfile = asyncHandler(async (req, res) => {
  const profile = await EmployerProfile.findOne({ user: req.user._id });
  if (!profile) {
    res.status(404);
    throw new Error('Employer profile not found');
  }
  res.status(200).json({ success: true, data: profile });
});

// @desc    Update the logged-in employer's company profile
// @route   PUT /api/employer/profile
// @access  Private/Employer
const updateMyProfile = asyncHandler(async (req, res) => {
  const allowed = ['companyName', 'industry', 'district', 'address', 'gstNumber', 'establishmentType', 'contactPerson'];
  const updates = {};
  allowed.forEach((field) => {
    if (req.body[field] !== undefined) updates[field] = req.body[field];
  });

  const profile = await EmployerProfile.findOneAndUpdate({ user: req.user._id }, updates, {
    new: true,
    upsert: true,
    runValidators: true,
  });
  res.status(200).json({ success: true, data: profile });
});

// @desc    Submit a worker requirement as structured fields (a normal web/app form)
// @route   POST /api/employer/requirements
//          { district, location?, occupation, requiredWorkers, requiredSkills?, salary?, experience?, urgency? }
// @access  Private/Employer
const createRequirement = asyncHandler(async (req, res) => {
  const { district, location, occupation, requiredWorkers, requiredSkills, salary, experience, urgency } = req.body;

  if (!district || !occupation || !requiredWorkers) {
    res.status(400);
    throw new Error('district, occupation and requiredWorkers are required');
  }

  const requirement = await WorkerRequirement.create({
    employer: req.user._id,
    district,
    location,
    occupation,
    requiredWorkers,
    requiredSkills,
    salary,
    experience,
    urgency,
    source: 'form',
  });

  await EmployerProfile.findOneAndUpdate(
    { user: req.user._id },
    { $inc: { totalRequirementsPosted: 1 } },
    { upsert: true }
  );

  res.status(201).json({ success: true, data: requirement });
});

// @desc    Submit a worker requirement as a raw voice/text utterance in Hindi/Chhattisgarhi/English,
//          e.g. { text: "Mujhe chaaris welder chahiye", district: "raipur", lang: "cg" }.
//          The utterance is parsed into structured fields; low-confidence parses are still saved
//          (status stays reviewable via parseConfidence) so nothing the employer said is lost.
// @route   POST /api/employer/requirements/voice
// @access  Private/Employer
const createRequirementFromVoice = asyncHandler(async (req, res) => {
  const { text, district, lang } = req.body;
  if (!text || !district) {
    res.status(400);
    throw new Error('text and district are required');
  }

  const parsed = parseWorkerRequirement(text, lang);
  if (!parsed.occupation || !parsed.requiredWorkers) {
    res.status(422);
    throw new Error(
      `Could not confidently parse an occupation and worker count from "${text}". ` +
        'Please submit via the structured form instead, or resend with clearer wording.'
    );
  }

  const requirement = await WorkerRequirement.create({
    employer: req.user._id,
    district,
    occupation: parsed.occupation,
    requiredWorkers: parsed.requiredWorkers,
    urgency: parsed.urgency,
    source: lang === 'en' ? 'text' : 'voice',
    rawInput: parsed.rawInput,
    parseConfidence: parsed.confidence,
  });

  await EmployerProfile.findOneAndUpdate(
    { user: req.user._id },
    { $inc: { totalRequirementsPosted: 1 } },
    { upsert: true }
  );

  res.status(201).json({ success: true, data: requirement, needsReview: parsed.needsReview });
});

// @desc    List the logged-in employer's own requirements
// @route   GET /api/employer/requirements/me?status=
// @access  Private/Employer
const getMyRequirements = asyncHandler(async (req, res) => {
  const filter = { employer: req.user._id };
  if (req.query.status) filter.status = req.query.status;
  const requirements = await WorkerRequirement.find(filter).sort('-createdAt');
  res.status(200).json({ success: true, count: requirements.length, data: requirements });
});

// @desc    Update a requirement's fill status / workers hired (employer, own requirement only)
// @route   PUT /api/employer/requirements/:id  { status?, workersHired? }
// @access  Private/Employer
const updateMyRequirement = asyncHandler(async (req, res) => {
  const { status, workersHired, requiredSkills, salary, experience, urgency } = req.body;
  const update = {};
  if (status !== undefined) update.status = status;
  if (workersHired !== undefined) update.workersHired = workersHired;
  if (requiredSkills !== undefined) update.requiredSkills = requiredSkills;
  if (salary !== undefined) update.salary = salary;
  if (experience !== undefined) update.experience = experience;
  if (urgency !== undefined) update.urgency = urgency;

  const requirement = await WorkerRequirement.findOneAndUpdate(
    { _id: req.params.id, employer: req.user._id },
    update,
    { new: true, runValidators: true }
  );
  if (!requirement) {
    res.status(404);
    throw new Error('Requirement not found');
  }
  res.status(200).json({ success: true, data: requirement });
});

// @desc    List all worker requirements across every employer (govt dashboard / admin view),
//          this is the "employer advice: find workers" + demand-side input to the skill graph.
// @route   GET /api/employer/requirements?district=&occupation=&status=&page=&limit=
// @access  Private/Admin
const getAllRequirements = asyncHandler(async (req, res) => {
  const { district, occupation, status, page = 1, limit = 20 } = req.query;
  const filter = {};
  if (district) filter.district = district;
  if (occupation) filter.occupation = occupation;
  if (status) filter.status = status;

  const skip = (Number(page) - 1) * Number(limit);
  const [requirements, total] = await Promise.all([
    WorkerRequirement.find(filter)
      .populate('employer', 'name email district')
      .skip(skip)
      .limit(Number(limit))
      .sort('-createdAt'),
    WorkerRequirement.countDocuments(filter),
  ]);

  res.status(200).json({
    success: true,
    count: requirements.length,
    total,
    page: Number(page),
    pages: Math.ceil(total / Number(limit)),
    data: requirements,
  });
});

// @desc    Find workers (jobseeker/student/restart users) in the requirement's district whose
//          stored skills best match the occupation/requiredSkills — the "employer advice: find
//          workers" step. Read-only matching against existing skill data; does not notify/apply
//          anyone.
// @route   GET /api/employer/requirements/:id/candidates?limit=25
// @access  Private/Employer (own requirement only)
const getCandidatesForRequirement = asyncHandler(async (req, res) => {
  const requirement = await WorkerRequirement.findOne({ _id: req.params.id, employer: req.user._id });
  if (!requirement) {
    res.status(404);
    throw new Error('Requirement not found');
  }

  const limit = Number(req.query.limit) || 25;
  const workers = await User.find({
    district: requirement.district,
    role: { $in: ['jobseeker', 'student', 'restart'] },
    isActive: true,
  }).select('name email phone role district');

  const scored = await Promise.all(
    workers.map(async (worker) => {
      const skillNames = await getUserSkillNames(worker);
      return { worker, ...scoreWorkerMatch(requirement, skillNames) };
    })
  );

  const ranked = scored
    .filter((s) => s.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, limit);

  res.status(200).json({ success: true, count: ranked.length, data: ranked });
});

module.exports = {
  getMyProfile,
  updateMyProfile,
  createRequirement,
  createRequirementFromVoice,
  getMyRequirements,
  updateMyRequirement,
  getAllRequirements,
  getCandidatesForRequirement,
};
