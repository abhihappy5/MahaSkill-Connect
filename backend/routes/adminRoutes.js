const express = require('express');
const {
  getKpis,
  getDistrictIntelligence,
  getApplicationsFunnel,
  getUserBreakdown,
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect, authorize('admin'));
router.get('/kpis', getKpis);
router.get('/district-intelligence', getDistrictIntelligence);
router.get('/applications-funnel', getApplicationsFunnel);
router.get('/user-breakdown', getUserBreakdown);

module.exports = router;
