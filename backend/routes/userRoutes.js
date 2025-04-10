const express = require("express")
const {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile
} = require("../Controllers/userController")
const { protect } = require("../middlewares/authMiddleware")

const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/:id", protect, getUserProfile) 
router.put("/:id", protect, updateUserProfile)

module.exports = router