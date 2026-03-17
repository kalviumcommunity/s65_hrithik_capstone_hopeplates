const express = require("express")
const multer = require("multer")

const {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    uploadUserImages,
    uploadProfilePhoto,
    deleteAboutImage,
    getUserById
} = require("../Controllers/userController")
const { protect } = require("../middlewares/authMiddleware")

const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/user_images/")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
})
const upload = multer({ storage })

router.delete("/delete-about-image", protect, deleteAboutImage)
router.post("/upload-profile-photo", protect, upload.single("profilePhoto"), uploadProfilePhoto)
router.post("/upload-images", protect, upload.array("images", 10), uploadUserImages)
router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/profile", protect, getUserProfile) 
router.put("/:id", protect, updateUserProfile)
router.get("/:id", protect, getUserById);

module.exports = router