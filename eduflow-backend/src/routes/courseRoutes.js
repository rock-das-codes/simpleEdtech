import express from "express";


const router = express.Router();
import {
    getAllCourses,
    createCourse,
    myCourses,
    addLessonToCourse,
    getCourseById,
    updateCourse,
    deleteCourse,
    updateLesson,
    deleteLesson
} from "../controllers/courseControllers.js"
import { authMiddleware } from "../middleware/authmiddleware.js";

router.route("/getAllCourses").get(getAllCourses);
router.route("/createCourse").post(authMiddleware,createCourse);
router.route("/myCourses").get(authMiddleware, myCourses);
router.route("/addLessonToCourse").post(authMiddleware, addLessonToCourse);
router.route("/getCourseById/:id").get(authMiddleware, getCourseById);
router.route("/updateCourse/:id").put(authMiddleware, updateCourse);
router.route("/deleteCourse/:id").delete(authMiddleware, deleteCourse);
router.route("/updateLesson/:id").put(authMiddleware, updateLesson);
router.route("/deleteLesson/:id").delete(authMiddleware, deleteLesson);

export default router;