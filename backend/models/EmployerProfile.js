const mongoose = require('mongoose');

const employerProfileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    companyName: { type: String, trim: true },
    industry: { type: String, trim: true },
    district: { type: String, trim: true, index: true },
    address: String,
    // Optional business-identity fields — kept optional since not every small/informal
    // employer (e.g. a local contractor hiring 2 masons) will have these on hand.
    gstNumber: { type: String, trim: true },
    establishmentType: {
      type: String,
      enum: ['proprietorship', 'partnership', 'pvt-ltd', 'government', 'informal', 'other'],
    },
    contactPerson: String,
    verified: { type: Boolean, default: false }, // admin-verified via GST/business data
    totalRequirementsPosted: { type: Number, default: 0 },
    totalWorkersHired: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('EmployerProfile', employerProfileSchema);
