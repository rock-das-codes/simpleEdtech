const mongoose = require("mongoose");

const EnrollmentSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    completedLessons: { type: [String], default: [] },
    progress: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model("Enrollment", EnrollmentSchema);
