const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

exports.protect = async (req, res, next) => {
    let token
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1]
            console.log("Token received:", token) 
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            console.log("Decoded token:", decoded) 
            req.user = await User.findById(decoded.id).select("-password")
            if (!req.user) {
                console.log("User not found for ID:", decoded.id) 
                return res.status(404).json({ message: "User not found" })
            }
            next()
        } catch (err) {
            console.error("Token verification failed:", err.message)
            return res.status(401).json({ message: "Not authorized, token failed" })
        }
    } else {
        console.error("No token provided") 
        return res.status(401).json({ message: "Not authorized, no token" })
    }
}

exports.adminOnly = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied. Admins only." })
    }
    next()
}