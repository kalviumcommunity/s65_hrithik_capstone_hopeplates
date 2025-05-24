const express = require("express")
const multer = require("multer")

const {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    uploadUserImages
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

router.post("/upload-images", protect, upload.array("images", 10), uploadUserImages)
router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/profile", protect, getUserProfile) 
router.get("/:id", protect, getUserProfile) 
router.put("/:id", protect, updateUserProfile)

module.exports = router