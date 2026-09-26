const express = require('express');
const {
  applyToJob,
  getMyApplications,
  withdrawApplication,
  getApplications,
  updateApplicationStatus,
} = require('../controllers/applicationController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, applyToJob);
router.get('/me', protect, getMyApplications);
router.delete('/:id', protect, withdrawApplication);

router.get('/', protect, authorize('admin'), getApplications);
router.put('/:id/status', protect, authorize('admin'), updateApplicationStatus);

module.exports = router;
