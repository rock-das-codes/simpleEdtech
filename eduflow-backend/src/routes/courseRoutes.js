const express = require("express");
const { authMiddleware, authorizeRole } = require("../middleware/authmiddleware");
const Course = require("../models/Course");
const router = express.Router();

// Only instructors can create courses
router.post("/create", authMiddleware, authorizeRole(["instructor", "admin"]), async (req, res) => {
    try {
        const { title, description, lessons } = req.body;
        const newCourse = new Course({
          title,
          description,
          instructor: req.user.id,
          lessons
        });
    
        await newCourse.save();
        res.status(201).json({ message: "Course created successfully!", course: newCourse });
      } catch (error) {
        res.status(500).json({ message: "Error creating course", error });
      }
});

// Students & instructors can access courses
router.get("/all", authMiddleware, async (req, res) => {
    try {
        const courses = await Course.find().populate("instructor", "name email");
        res.status(200).json(courses);
      } catch (error) {
        res.status(500).json({ message: "Error fetching courses", error });
      }
});
router.get("/:id", authMiddleware, async (req, res) => {
    try {
      const course = await Course.findById(req.params.id).populate("instructor", "name email");
      if (!course) return res.status(404).json({ message: "Course not found" });
  
      res.status(200).json(course);
    } catch (error) {
      res.status(500).json({ message: "Error fetching course", error });
    }
  });

  router.put("/:id", authMiddleware, authorizeRole(["instructor", "admin"]), async (req, res) => {
    try {
      const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
  
      if (!updatedCourse) return res.status(404).json({ message: "Course not found" });
  
      res.status(200).json({ message: "Course updated successfully!", course: updatedCourse });
    } catch (error) {
      res.status(500).json({ message: "Error updating course", error });
    }
  }); 

  router.delete("/:id", authMiddleware, authorizeRole(["instructor", "admin"]), async (req, res) => {
    try {
      const deletedCourse = await Course.findByIdAndDelete(req.params.id);
  
      if (!deletedCourse) return res.status(404).json({ message: "Course not found" });
  
      res.status(200).json({ message: "Course deleted successfully!" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting course", error });
    }
  });

module.exports = router;
