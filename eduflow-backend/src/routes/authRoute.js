import { Router } from "express"
import { registerUser, login, logout, refreshAccesToken, changePassword, getCurrentUser, updateAccountDetails, deleteUser, getUserInfo } from "./../controllers/userControllers.js"

import {authMiddleware} from "../middleware/authmiddleware.js"

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(login)
router.route("/logout").post(authMiddleware,logout)
router.route("/refresh-token").post(refreshAccesToken)
router.route("/update-password").post(authMiddleware, changePassword)
router.route("/current-user").get(authMiddleware, getCurrentUser)
router.route("/update-details").post(authMiddleware, updateAccountDetails)

router.route("/delete-user").post(authMiddleware, deleteUser)
router.route("/getUserInfo/:id").get(authMiddleware,getUserInfo)

export default router;