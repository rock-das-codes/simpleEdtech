import { User } from "../models/user";
import bcrypt from "bcryptjs"
import asyncHandler from "./../utils/asynchandler"
import ApiResponse from "./../utils/ApiResponse"
import ApiError from "./../utils/ApiError"

const registerUser = asyncHandler(async (req,res)=>{
    const {email,password,username} = req.body
    if(!email||!password||!username){
        throw new ApiError(404,"all fields are required")
    }
    const user =await User.findOne(
      {  $or:[{username},{email}]}
    )
    if(user){
        throw new ApiError(400,"user already exists")
    }
    const newUser = await User.create({
        username,
        password,
        email
    })
    const createdUser = await User.findById(user._id).select("--password --refreshToken");
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
        throw new ApiError(400,"all fiels are required")
    }
    const findUser = await User.findOne({email})
    if(!findUser){
        throw new ApiError(400,"No user found");
        
    }
    const passwordValidity = await findUser.isPasswordMatching(password)
    if(!passwordValidity){
        throw new ApiError(400,"enter correct password")
    }
    const {refreshToken,accessToken} =await generateAccessandRefreshToken(findUser._id)
    findUser.refreshToken = refreshToken
    const opts={
        httpOnly:true,
        secure:process.env.NODE_ENV === "production",
    }
    const loggedINUser = await User.findById(findUser._id).select("--password --refreshToken")

    return res
    .status(200)
    .cookie("refreshToken",refreshToken)
    .cookie("accessToken",accessToken)
    .json(new ApiResponse(200,"loggenin user"))
})