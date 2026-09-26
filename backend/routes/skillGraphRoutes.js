const express = require('express');
const {
  getSkillGraph,
  getDistrictSkillGraph,
  upsertSkillGraphEntry,
  recomputeSkillGaps,
  recommendForWorker,
} = require('../controllers/skillGraphController');
const { protect, authorize, optionalAuth } = require('../middleware/auth');

const router = express.Router();

router.get('/', getSkillGraph);
router.post('/recompute', protect, authorize('admin'), recomputeSkillGaps);
router.get('/:district/recommend', optionalAuth, recommendForWorker);
router.get('/:district', getDistrictSkillGraph);
router.put('/:district/:occupation', protect, authorize('admin'), upsertSkillGraphEntry);

module.exports = router;
