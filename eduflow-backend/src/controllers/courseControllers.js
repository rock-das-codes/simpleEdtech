import { asyncHandler } from "./../utils/asynchandler.js"
import { ApiResponse } from "./../utils/ApiResponse.js"
import { ApiError } from "./../utils/ApiError.js"

import { Course } from "../models/Course.js"

const getAllCourses = asyncHandler(async (req, res) => {
    const keyword = req.query.keyword || "";
    const tags = req.query.tags || "";
    const courses = await Course.find({
        $or: [
            { title: { $regex: keyword, $options: "i" } },
            { tags: { $regex: tags, $options: "i" } }
        ]
    })
    return res.status(200).json(new ApiResponse(200, courses, "Courses fetched successfully"))
})

const createCourse = asyncHandler(async (req, res) => {
    const { title, description, tags, introductoryVideoUrl } = req.body;
    if (!title || !description || !tags) {
        throw new ApiError(400, "All fields are required")
    }
    const course = await Course.create({
        title,
        description,
        tags,
        introductoryVideoUrl,
        instructor: req.user._id
    })
    return res.status(201).json(new ApiResponse(201, course, "Course created successfully"))
})
const myCourses = asyncHandler(async (req, res) => {
    const courses = await Course.find({ instructor: req.user._id });
    if (!courses) {
        throw new ApiError(404, "No courses found")

    }
    return res.status(200).json(new ApiResponse(200, courses, "Courses fetched successfully"))
})
const addLessonToCourse = asyncHandler(async (req, res) => {
    const { courseId, title, videoUrl, content } = req.body;
    if (!courseId || !title || !videoUrl || !content) {
        throw new ApiError(400, "All fields are required")
    }
    const course = await Course.findById(courseId);
    if (!course) {
        throw new ApiError(404, "Course not found")
    }
    if (course.instructor.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You are not authorized to add lessons to this course")
    }
    course.lessons.push({
        title,
        video: videoUrl,
        content
    })
    await course.save();
    return res.status(200).json(new ApiResponse(200, course, "Lesson added successfully"))
})

const getCourseById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw new ApiError(400, "Course id is required")
    }
    const course = await Course.findById(id);
    if (!course) {
        throw new ApiError(404, "Course not found")
    }
    return res.status(200).json(new ApiResponse(200, course, "Course fetched successfully"))
})
const updateCourse = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, description, tags, introductoryVideoUrl } = req.body;
    if (!id) {
        throw new ApiError(400, "Course id is required")
    }
    const course = await Course.findById(id);
    if (!course) {
        throw new ApiError(404, "Course not found")
    }
    if (course.instructor.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You are not authorized to update this course")
    }
    course.title = title || course.title;
    course.description = description || course.description;
    course.tags = tags || course.tags;
    course.introductoryVideoUrl = introductoryVideoUrl || course.introductoryVideoUrl;
    await course.save();
    return res.status(200).json(new ApiResponse(200, course, "Course updated successfully"))
})
const deleteCourse = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw new ApiError(400, "Course id is required")
    }
    const course = await Course.findById(id);
    if (!course) {
        throw new ApiError(404, "Course not found")
    }
    if (course.instructor.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You are not authorized to delete this course")
    }
    await Course.findByIdAndDelete(id);
    return res.status(200).json(new ApiResponse(200, {}, "Course deleted successfully"))
})
const updateLesson = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { courseId, lessonId, title, videoUrl, content } = req.body;
    if (!courseId || !lessonId) {
        throw new ApiError(400, "Course id and lesson id are required")
    }
    const course = await Course.findById(courseId);
    if (!course) {
        throw new ApiError(404, "Course not found")
    }
    if (course.instructor.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You are not authorized to update this course")
    }
    const lesson = course.lessons.id(lessonId);
    if (!lesson) {
        throw new ApiError(404, "Lesson not found")
    }
    lesson.title = title || lesson.title;
    lesson.video = videoUrl || lesson.video;
    lesson.content = content || lesson.content;
    await course.save();
    return res.status(200).json(new ApiResponse(200, course, "Lesson updated successfully"))
})
const deleteLesson = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { courseId, lessonId } = req.body;
    if (!courseId || !lessonId) {
        throw new ApiError(400, "Course id and lesson id are required")
    }
    const course = await Course.findById(courseId);
    if (!course) {
        throw new ApiError(404, "Course not found")
    }
    if (course.instructor.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You are not authorized to update this course")
    }
    const lesson = course.lessons.id(lessonId);
    if (!lesson) {
        throw new ApiError(404, "Lesson not found")
    }
    lesson.remove();
    await course.save();
    return res.status(200).json(new ApiResponse(200, course, "Lesson deleted successfully"))
})
export {
    getAllCourses,
    createCourse,
    myCourses,
    addLessonToCourse,
    getCourseById,
    updateCourse,
    deleteCourse,
    updateLesson,
    deleteLesson
}

