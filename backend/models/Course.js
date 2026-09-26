const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    provider: String,
    district: { type: String, index: true },
    division: String,
    sector: { type: String, index: true },
    duration: String,
    fee: String,
    stipend: String,
    eligibility: String,
    placementRate: String,
    nsqfLevel: String,
    rating: { type: Number, min: 0, max: 5, default: 0 },
    reviewsCount: { type: Number, default: 0 },
    seatsAvailable: { type: Number, default: 0 },
    skills: [String],
    description: String,
    audience: {
      type: [String],
      enum: ['public', 'student', 'jobseeker', 'restart'],
      default: ['public'],
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

courseSchema.index({ title: 'text', description: 'text', skills: 'text' });

module.exports = mongoose.model('Course', courseSchema);
