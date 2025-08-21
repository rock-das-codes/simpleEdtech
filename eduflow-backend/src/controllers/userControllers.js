import { User } from "../models/user.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import {asyncHandler} from "./../utils/asynchandler.js"
import {ApiResponse} from "./../utils/ApiResponse.js"
import {ApiError} from "./../utils/ApiError.js"

const registerUser = asyncHandler(async (req,res)=>{
    const {email,password,username} = req.body
    if(!email||!password||!username){
        throw new ApiError("all fields are required")
    }
    const user =await User.findOne(
      {  $or:[{username},{email}]}
    )
    if(user){
        throw new ApiError("user already exists")
    }
    const newUser = await User.create({
        username,
        password,
        email
    })
    const createdUser = await User.findById(newUser._id).select("-password -refreshToken");
    if(!createdUser){
        throw new ApiError(400,"creation failed")
    }
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully..")
    )
})
const generateAccessandRefreshToken =async function(userid){
    const user = await User.findById(userid)
    if(!user){
        throw new ApiError(400,"no user found")
    }
    const refreshToken=user.generateRefreshToken()
    const accessToken = user.generateAccessToken()

    if(refreshToken){
        user.refreshToken = refreshToken
    }
    await user.save({validateBeforeSave:false})
    return {refreshToken,accessToken}
}

const login = asyncHandler(async function(req,res){
    const {email,password} = req.body
    if(!email||!password){
        throw new ApiError("all fiels are required")
    }
    const findUser = await User.findOne({email})
    if(!findUser){
        throw new ApiError("No user found");
        
    }
    const passwordValidity = await findUser.isPasswordMatching(password)
    if(!passwordValidity){
        throw new ApiError("enter correct password")
    }
    const {refreshToken,accessToken} =await generateAccessandRefreshToken(findUser._id)
    findUser.refreshToken = refreshToken
    const opts={
        httpOnly:true,
        secure:process.env.NODE_ENV === "production",
    }
    const loggedINUser = await User.findById(findUser._id).select("-password -refreshToken")

    return res
    .status(200)
    .cookie("refreshToken",refreshToken)
    .cookie("accessToken",accessToken)
    .json(new ApiResponse(200,loggedINUser,"logged in user"))
})

const logout = asyncHandler(async function(req,res){
    await User.findByIdAndUpdate(req.user._id,
        {
            $set:{
                refreshToken:undefined
            }
        },
        {new:true}

    )
    const Opts={
        httpOnly:true,
        secure:process.env.NODE_ENV =="production"

    }
    return res
        .status(200)
        .clearCookie("refreshToken",Opts)
        .clearCookie("accessToken",Opts)
        .json(new ApiResponse(200,{},"successfully logged out"))

})

const refreshAccesToken = asyncHandler(async function(req,res){
    const clientRefreshToken = req.body.refreshToken || req.cookies.refreshToken;
    if(!clientRefreshToken){
        throw new ApiError("please login again")
    }
    try {
        const checkRefreshToken = jwt.verify(clientRefreshToken,process.env.REFRESH_TOKEN_SECRET)
        if(!checkRefreshToken){
            throw new ApiError("refresh token expired")
        }
        const user = await User.findById(checkRefreshToken._id)
        if(!user){
            throw new ApiError("no user found")
        }
        if(user.refreshToken != clientRefreshToken){
            throw new ApiError("refresh token expired or in use")
        }
        const {refreshToken,accessToken} = await generateAccessandRefreshToken(user._id)

        const opts={
            httpOnly:true,
            secure: process.env.NODE_ENV === "production"
        }
        return res.
        status(200)
        .cookie("refreshToken",refreshToken,opts)
        .cookie("accessToken",accessToken,opts)
        .json(new ApiResponse(200,user, "accessToken refreshed"))
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token");
    }
})

const changePassword = asyncHandler(async function(req,res){
    const {oldPassword,newPassword} = req.body;
    try {
        const user = await User.findById(req.user?._id)
        const isOldPasswordCorrect = user.isPasswordMatching(oldPassword)
        if(!isOldPasswordCorrect){
            throw new ApiError("password incorrect")
        }
        user.password = newPassword
        await user.save({validateBeforeSave:false})
        return res
        .status(200)
        .json(new ApiResponse(200,"password changed"))
    } catch (error) {
         throw new ApiError( error?.message || "Something went wrong")
    }
})


const getCurrentUser = asyncHandler(async function(req,res){
    return res
        .status(200)
        .json(new ApiResponse(200,req.user,"user fetched successfully"))
})
const updateAccountDetails = asyncHandler(async function(req,res){
    const {email,username} = req.body;
    if(!email || !username){
        throw new ApiError("all field are required")
    }
    try {
        const user = await User.findByIdAndUpdate(
            req.user?._id,
            {
                $set:{
                    username,
                    email
                }
            }
            ,
            {new:true}
        ).select("-password")


        return res
        .status(200)
        .json(new ApiResponse(200, {user},"updated succesfully"))
    } catch (error) {
        throw new ApiError(401, error?.message || "Something went wrong while updating")
    }
})

const deleteUser = asyncHandler(async function(req,res){
    await User.findByIdAndDelete(
        req.user?._id,
        { $set:{
            refreshToken:undefined
        }
    ,
},  {new:true}
    )

    const opts = {
        httpOnly:true,
        secure:process.env.NODE_ENV === "production"
    }
    return res
    .status(200)
     .clearCookie("accessToken", opts)
    .clearCookie("refreshToken", opts)
    .json(new ApiResponse(200, {}, "User deleted successfully.."))
})

const getUserInfo = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId).select("-password -refreshToken")
    if (!user) {
        throw new ApiError(404, "User credentials not found for given userId");
    }
    return res
        .status(200)
        .json(new ApiResponse(200, user, "Details of the user fetched successfully"))
})
export { registerUser, login, logout, refreshAccesToken, changePassword, getCurrentUser, updateAccountDetails, deleteUser, getUserInfo }