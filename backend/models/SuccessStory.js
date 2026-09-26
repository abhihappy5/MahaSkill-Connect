const mongoose = require('mongoose');

const successStorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    nameMr: String,
    nameHi: String,
    district: String,
    districtMr: String,
    districtHi: String,
    role: String,
    roleMr: String,
    roleHi: String,
    company: String,
    background: String,
    category: String,
    categoryMr: String,
    categoryHi: String,
    quote: String,
    quoteMr: String,
    quoteHi: String,
    initialIncome: String,
    placedSalary: String,
    verifiedScheme: String,
    badge: String,
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('SuccessStory', successStorySchema);
