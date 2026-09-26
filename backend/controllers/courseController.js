const asyncHandler = require('express-async-handler');
const Course = require('../models/Course');
const StudentProfile = require('../models/StudentProfile');

// @desc    List/search/filter courses (Public Courses Explorer + Student course browser)
// @route   GET /api/courses?district=Pune&sector=EV&search=battery&page=1&limit=12
// @access  Public
const getCourses = asyncHandler(async (req, res) => {
  const { district, sector, audience, search, page = 1, limit = 12 } = req.query;
  const filter = { isActive: true };
  if (district) filter.district = district;
  if (sector) filter.sector = sector;
  if (audience) filter.audience = audience;
  if (search) filter.$text = { $search: search };

  const skip = (Number(page) - 1) * Number(limit);
  const [courses, total] = await Promise.all([
    Course.find(filter).skip(skip).limit(Number(limit)).sort('-rating'),
    Course.countDocuments(filter),
  ]);

  res.status(200).json({
    success: true,
    count: courses.length,
    total,
    page: Number(page),
    pages: Math.ceil(total / Number(limit)),
    data: courses,
  });
});

// @desc    Get a single course
// @route   GET /api/courses/:id
// @access  Public
const getCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    res.status(404);
    throw new Error('Course not found');
  }
  res.status(200).json({ success: true, data: course });
});

// @desc    Create a course (admin)
// @route   POST /api/courses
// @access  Private/Admin
const createCourse = asyncHandler(async (req, res) => {
  const course = await Course.create(req.body);
  res.status(201).json({ success: true, data: course });
});

// @desc    Update a course (admin)
// @route   PUT /api/courses/:id
// @access  Private/Admin
const updateCourse = asyncHandler(async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!course) {
    res.status(404);
    throw new Error('Course not found');
  }
  res.status(200).json({ success: true, data: course });
});

// @desc    Delete (soft) a course (admin)
// @route   DELETE /api/courses/:id
// @access  Private/Admin
const deleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
  if (!course) {
    res.status(404);
    throw new Error('Course not found');
  }
  res.status(200).json({ success: true, message: 'Course deactivated' });
});

// @desc    Enroll the logged-in student into a course
// @route   POST /api/courses/:id/enroll
// @access  Private/Student
const enrollInCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    res.status(404);
    throw new Error('Course not found');
  }

  const profile = await StudentProfile.findOneAndUpdate(
    { user: req.user._id, 'enrolledCourses.course': { $ne: course._id } },
    {
      $push: {
        enrolledCourses: {
          course: course._id,
          progress: 0,
          totalModules: 0,
          totalHours: 0,
          stipendEligible: Boolean(course.stipend),
          stipendAmount: course.stipend,
          badge: course.fee,
        },
      },
    },
    { new: true }
  );

  if (!profile) {
    res.status(400);
    throw new Error('Already enrolled in this course, or student profile missing');
  }
  res.status(200).json({ success: true, data: profile });
});

module.exports = { getCourses, getCourse, createCourse, updateCourse, deleteCourse, enrollInCourse };
