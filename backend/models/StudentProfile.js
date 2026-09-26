const mongoose = require('mongoose');

const skillMatrixItemSchema = new mongoose.Schema(
  {
    skill: String,
    level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'] },
    score: { type: Number, min: 0, max: 100 },
    verified: { type: Boolean, default: false },
    authority: String,
  },
  { _id: false }
);

const enrolledCourseSchema = new mongoose.Schema(
  {
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    progress: { type: Number, min: 0, max: 100, default: 0 },
    completedModules: { type: Number, default: 0 },
    totalModules: Number,
    hoursCompleted: { type: Number, default: 0 },
    totalHours: Number,
    nextMilestone: String,
    instructor: String,
    stipendEligible: Boolean,
    stipendAmount: String,
    badge: String,
  },
  { _id: false }
);

const milestoneSchema = new mongoose.Schema(
  {
    step: Number,
    title: String,
    status: { type: String, enum: ['Completed', 'In Progress', 'Upcoming', 'Target'] },
    duration: String,
    topics: [String],
    score: String,
    progress: String,
  },
  { _id: false }
);

const studentProfileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    studentId: { type: String, unique: true, sparse: true },
    institution: String,
    stream: String,
    semester: String,
    gpa: String,
    careerMatchScore: { type: Number, min: 0, max: 100, default: 0 },
    learningStreak: { type: Number, default: 0 },
    coinsEarned: { type: Number, default: 0 },
    targetCareer: String,
    targetDistrict: String,
    skillMatrix: [skillMatrixItemSchema],
    enrolledCourses: [enrolledCourseSchema],
    learningPathMilestones: [milestoneSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('StudentProfile', studentProfileSchema);
