const express = require("express")
const {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile
} = require("../Controllers/userController")

const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/:id", getUserProfile)
router.put("/:id", updateUserProfile)

module.exports = router