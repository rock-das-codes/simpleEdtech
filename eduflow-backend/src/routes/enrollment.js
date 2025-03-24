const express = require("express");
const router = express.Router();
const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course"); // ✅ Ensure Course model is imported
const { authMiddleware } = require("./../midddleware/authmiddleware"); // ✅ Fix middleware path

// 🔹 Enroll in a course
router.post("/enroll", authMiddleware, async (req, res) => {
  try {
    const { courseId } = req.body;
    const studentId = req.user.id;

    // ✅ Check if the course exists before enrolling
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    // ✅ Prevent duplicate enrollment
    const existingEnrollment = await Enrollment.findOne({ studentId, courseId });
    if (existingEnrollment) {
      return res.status(400).json({ message: "Already enrolled in this course." });
    }

    // ✅ Enroll student
    const enrollment = new Enrollment({ studentId, courseId });
    await enrollment.save();

    res.status(201).json({ message: "Enrolled successfully", enrollment });
  } catch (error) {
    console.error("Enrollment Error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// 🔹 Get My Courses
router.get("/my-courses", authMiddleware, async (req, res) => {
  try {
    const studentId = req.user.id;
    const enrollments = await Enrollment.find({ studentId }).populate("courseId");

    res.json(enrollments);
  } catch (error) {
    console.error("Fetch Courses Error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// 🔹 Update Course Progress
router.post("/update-progress", authMiddleware, async (req, res) => {
  try {
    const { courseId, lessonId } = req.body;
    const studentId = req.user.id;

    // ✅ Check if enrollment exists
    const enrollment = await Enrollment.findOne({ studentId, courseId });
    if (!enrollment) {
      return res.status(404).json({ message: "Not enrolled in this course." });
    }

    // ✅ Fetch course to get total lessons
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    // ✅ Prevent duplicate progress updates
    if (!enrollment.completedLessons.includes(lessonId)) {
      enrollment.completedLessons.push(lessonId);
    }

    // ✅ Calculate progress
    const totalLessons = course.lessons.length;
    enrollment.progress = ((enrollment.completedLessons.length / totalLessons) * 100).toFixed(2);

    await enrollment.save();
    res.json({ message: "Progress updated", progress: enrollment.progress });
  } catch (error) {
    console.error("Update Progress Error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// 🔹 Get Course Progress
router.get("/progress/:courseId", authMiddleware, async (req, res) => {
  try {
    const { courseId } = req.params;
    const studentId = req.user.id;

    const enrollment = await Enrollment.findOne({ studentId, courseId });
    if (!enrollment) {
      return res.status(404).json({ message: "Not enrolled in this course." });
    }

    res.json({
      courseId,
      progress: enrollment.progress,
      completedLessons: enrollment.completedLessons,
    });
  } catch (error) {
    console.error("Fetch Progress Error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// 🔹 Unenroll from a Course
router.delete("/unenroll/:courseId", authMiddleware, async (req, res) => {
  try {
    const { courseId } = req.params;
    const studentId = req.user.id;

    const enrollment = await Enrollment.findOneAndDelete({ studentId, courseId });
    if (!enrollment) {
      return res.status(404).json({ message: "Not enrolled in this course." });
    }

    res.json({ message: "Successfully unenrolled" });
  } catch (error) {
    console.error("Unenrollment Error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
