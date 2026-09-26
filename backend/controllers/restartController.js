const asyncHandler = require('express-async-handler');
const RestartProfile = require('../models/RestartProfile');
const Job = require('../models/Job');
const { getUserSkillNames } = require('./jobController');

// @desc    Get the logged-in restart user's transferable-skills + transition analysis.
//          (RestartSkillGap / TransferableSkillsMap components read from this)
// @route   GET /api/restart/transition-map
// @access  Private/Restart
const getTransitionMap = asyncHandler(async (req, res) => {
  const profile = await RestartProfile.findOne({ user: req.user._id });
  if (!profile) {
    res.status(404);
    throw new Error('Restart profile not found');
  }
  res.status(200).json({
    success: true,
    data: {
      previousRole: profile.previousRole,
      previousIndustry: profile.previousIndustry,
      existingSkills: profile.existingSkills,
      careerGoal: profile.careerGoal,
      readinessMetrics: profile.readinessMetrics,
    },
  });
});

// @desc    Jobs the restart user is ready for today vs. jobs unlocked once they finish more
//          of their learning path (RestartJobsOpportunities "Today" / "Unlocked" tabs)
// @route   GET /api/restart/jobs
// @access  Private/Restart
const getRestartJobs = asyncHandler(async (req, res) => {
  const skillNames = await getUserSkillNames(req.user);
  const jobs = await Job.find({ isActive: true, audience: 'restart' }).limit(20);

  const scored = jobs.map((job) => ({ job, ...job.computeMatch(skillNames) }));
  const today = scored.filter((s) => s.matchScore >= 90).map((s) => s.job);
  const unlocked = scored.filter((s) => s.matchScore < 90 && s.matchScore >= 50).map((s) => s.job);

  res.status(200).json({ success: true, data: { today, unlocked } });
});

// @desc    Update the restart learning path progress (marks a step completed/in-progress)
// @route   PUT /api/restart/learning-path/:step
// @access  Private/Restart
const updateLearningStep = asyncHandler(async (req, res) => {
  const { status, currentProgress } = req.body;
  const profile = await RestartProfile.findOne({ user: req.user._id });
  if (!profile) {
    res.status(404);
    throw new Error('Restart profile not found');
  }
  const step = profile.learningPath.find((s) => s.step === Number(req.params.step));
  if (!step) {
    res.status(404);
    throw new Error('Learning path step not found');
  }
  if (status) step.status = status;
  if (currentProgress !== undefined) step.currentProgress = currentProgress;
  await profile.save();
  res.status(200).json({ success: true, data: profile.learningPath });
});

module.exports = { getTransitionMap, getRestartJobs, updateLearningStep };
