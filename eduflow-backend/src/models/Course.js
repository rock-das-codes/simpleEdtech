import mongoose from "mongoose"

const Lessons = new mongoose.Schema({
  title:{type:String,required:true},
  video:String,
  content:String
},{_id:false})
const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], 
  introductoryVideoUrl: String,
  lessons: [Lessons]
}, { timestamps: true });

export const Course = mongoose.model('course',CourseSchema)
