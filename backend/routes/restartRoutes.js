const express = require('express');
const { getTransitionMap, getRestartJobs, updateLearningStep } = require('../controllers/restartController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect, authorize('restart'));
router.get('/transition-map', getTransitionMap);
router.get('/jobs', getRestartJobs);
router.put('/learning-path/:step', updateLearningStep);

module.exports = router;
