const mongoose = require('mongoose');

const STAGES = ['Applied', 'Shortlisted', 'Interview', 'Selected', 'Rejected'];

const applicationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    status: { type: String, enum: STAGES, default: 'Applied' },
    stageIndex: { type: Number, default: 1 }, // 1 Applied .. 4 Selected (5 = Rejected, out of band)
    interviewDate: String,
    interviewMode: String,
    recruiterNote: String,
    appliedDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

applicationSchema.index({ user: 1, job: 1 }, { unique: true }); // prevent duplicate applications

module.exports = mongoose.model('Application', applicationSchema);
module.exports.STAGES = STAGES;
