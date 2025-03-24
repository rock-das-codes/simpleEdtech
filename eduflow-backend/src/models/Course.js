const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Enrolled students
  lessons: [{ 
    title: String, 
    content: String, 
    videoUrl: String 
  }]
}, { timestamps: true });

module.exports = mongoose.model("Course", CourseSchema);
