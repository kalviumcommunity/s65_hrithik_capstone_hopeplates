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
            return next()
        } catch (err) {
            return res.status(401).json({ message: "Not authorized, token failed" })
        }
    }

    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token" })
    }
}