const express = require('express');
const {
  getTrendingCareers,
  getTrendingCareer,
  getEmergingSkills,
  upsertTrendingCareer,
} = require('../controllers/careerController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/trending', getTrendingCareers);
router.get('/trending/:slug', getTrendingCareer);
router.put('/trending/:slug', protect, authorize('admin'), upsertTrendingCareer);
router.get('/emerging-skills', getEmergingSkills);

module.exports = router;
