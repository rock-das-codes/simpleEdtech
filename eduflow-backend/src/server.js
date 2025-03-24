const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoute");
const courseRoutes = require("./routes/courseRoutes");
const enrollmentRoutes = require("./routes/enrollment");

dotenv.config();
connectDB();

const app = express();

// 🔹 CORS Middleware (Allows credentials for auth)
app.use(cors({
    origin: process.env.CORS_ORIGIN,// Replace with frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true  // ✅ Allows cookies & tokens
}));

// 🔹 Middleware to parse JSON
app.use(express.json());

// 🔹 Logger Middleware (Now placed before routes)
app.use((req, res, next) => {
    console.log(`Incoming Request: ${req.method} ${req.path}`);
    console.log("Headers:", req.headers);
    next();
});

// 🔹 Health Check Route
app.get("/", (req, res) => {
    res.send("EduFlow API is running...");
});

// 🔹 Register API Routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);

// 🔹 Global Error Handler Middleware
app.use((err, req, res, next) => {
    console.error("Server Error:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
});
app.use("/api/enrollments", enrollmentRoutes); 

// 🔹 Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
