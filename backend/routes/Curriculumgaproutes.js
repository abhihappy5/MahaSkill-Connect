const express = require('express');
const {
  getCurriculumGaps,
  getCurriculumGap,
  upsertCurriculumGap,
  recommendCurriculumUpdate,
} = require('../controllers/Curriculumgapcontroller');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Every route here is admin-only, same as the rest of adminRoutes.js.
router.use(protect, authorize('admin'));

router.get('/', getCurriculumGaps);
router.get('/:slug', getCurriculumGap);
router.put('/:slug', upsertCurriculumGap);
router.post('/:slug/recommend-update', recommendCurriculumUpdate);

module.exports = router;