import jwt from "jsonwebtoken"
import { User } from "../models/user.js";

export const  authMiddleware = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {   
    return res.status(401).json({ message: "Unauthorized access." });
  }     
  const token = req.cookies.accessToken || req.header("Authorization")?.replace("Bearer ", "")
  try {
     if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
       const user = await User.findById(decoded?._id).select("-password -refreshToken")

        if (!user) {
            throw new ApiError(401, "Invalid access token")
        }

        req.user = user;
    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    return res.status(401).json({ message: "Invalid token." });
  }
};
// const authorizeRole = (roles) => {
//     return (req, res, next) => {
//         if (!roles.includes(req.user.role)) {
//             return res.status(403).json({ message: "Unauthorized access." });
//         }
//         next();
//     };
// };

