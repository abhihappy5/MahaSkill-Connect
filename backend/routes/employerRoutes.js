const express = require('express');
const {
  getMyProfile,
  updateMyProfile,
  createRequirement,
  createRequirementFromVoice,
  getMyRequirements,
  updateMyRequirement,
  getAllRequirements,
  getCandidatesForRequirement,
} = require('../controllers/employerController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/profile', protect, authorize('employer'), getMyProfile);
router.put('/profile', protect, authorize('employer'), updateMyProfile);

router.post('/requirements', protect, authorize('employer'), createRequirement);
router.post('/requirements/voice', protect, authorize('employer'), createRequirementFromVoice);
router.get('/requirements/me', protect, authorize('employer'), getMyRequirements);
router.get('/requirements/:id/candidates', protect, authorize('employer'), getCandidatesForRequirement);
router.put('/requirements/:id', protect, authorize('employer'), updateMyRequirement);

// Admin/govt-dashboard view across every employer's requirements.
router.get('/requirements', protect, authorize('admin'), getAllRequirements);

module.exports = router;
