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

            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decoded.id).select("-password")
            if (!req.user) {
                return res.status(404).json({ message: "User not found" })
            }
            if (process.env.NODE_ENV === "development") {
                console.log("Token received:", token)
                console.log("Decoded token:", decoded)
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