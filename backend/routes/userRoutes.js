const express = require("express")
const {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    getUserById,
    uploadProfilePhoto,
    uploadUserImages,
    deleteAboutImage,
    getPendingVerifications,
    verifyUser,
    rejectUser
} = require("../Controllers/userController")
const { protect } = require("../middlewares/authMiddleware")
const upload = require("../middlewares/uploadMiddleware")

const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/profile", protect, getUserProfile)
router.put("/:id", protect, updateUserProfile)
router.get("/pending-verifications", protect, getPendingVerifications) // Admin only logically
router.put("/verify/:id", protect, verifyUser) // Admin only logically
router.delete("/reject/:id", protect, rejectUser) // Admin only logically
router.get("/:id", protect, getUserById)

router.post("/upload-profile-photo", protect, upload.single("profilePhoto"), uploadProfilePhoto)
router.post("/upload-images", protect, upload.array("images", 10), uploadUserImages)
router.delete("/delete-about-image", protect, deleteAboutImage)

module.exports = router