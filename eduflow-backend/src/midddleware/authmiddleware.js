const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
   const token = req.header("Authorization");
  
   if (!token || !token.startsWith("Bearer ")) return res.status(401).json({ message: "Access Denied" });

   try {
     const tokenValue = token.split(" ")[1];
       
       
       const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);
       
       
       req.user = decoded;
       next();
   } catch (error) {
    if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token Expired. Please login again." });
    } else {
        return res.status(401).json({ message: "Invalid Token. Authentication failed." });
    }
   }
};
const authorizeRole = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Unauthorized access." });
        }
        next();
    };
};
module.exports = {authMiddleware,authorizeRole};
