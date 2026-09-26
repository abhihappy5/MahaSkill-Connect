const express = require('express');
const { getDistricts, getDistrict, upsertDistrict } = require('../controllers/districtController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', getDistricts);
router.get('/:key', getDistrict);
router.put('/:key', protect, authorize('admin'), upsertDistrict);

module.exports = router;
