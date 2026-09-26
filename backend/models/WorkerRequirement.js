const mongoose = require('mongoose');

// Captures one employer "I need N workers of skill X" requirement — whether it arrived as a
// structured form submission or as raw Hindi/Chhattisgarhi voice/text ("Mujhe chaaris welder
// chahiye") that utils/parseWorkerRequirement.js turned into structured fields below.
const workerRequirementSchema = new mongoose.Schema(
  {
    employer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    district: { type: String, required: true, trim: true, index: true },
    location: String, // free-text specific address/site, district is the indexed/queryable unit

    occupation: { type: String, required: true, trim: true, index: true }, // normalized skill/occupation, e.g. "Welder"
    requiredWorkers: { type: Number, required: true, min: 1 },
    requiredSkills: [String],
    salary: String, // kept as display string (e.g. "₹15,000-18,000/month") like Job.salary
    experience: String, // e.g. "0-1 years", "2+ years"
    urgency: { type: String, enum: ['immediate', 'this-week', 'this-month', 'flexible'], default: 'flexible' },

    status: {
      type: String,
      enum: ['open', 'partially-filled', 'filled', 'closed'],
      default: 'open',
      index: true,
    },
    workersHired: { type: Number, default: 0 },

    // Raw-input provenance — lets an admin audit/correct what the parser inferred.
    source: { type: String, enum: ['form', 'voice', 'text', 'admin'], default: 'form' },
    rawInput: {
      text: String, // original utterance/message, e.g. "Mujhe chaaris welder chahiye"
      lang: { type: String, enum: ['en', 'mr', 'hi', 'cg'] }, // 'cg' = Chhattisgarhi
    },
    parseConfidence: { type: Number, min: 0, max: 100 }, // how confident the NLP parse was, for admin review queues
  },
  { timestamps: true }
);

workerRequirementSchema.index({ district: 1, occupation: 1 });

module.exports = mongoose.model('WorkerRequirement', workerRequirementSchema);
