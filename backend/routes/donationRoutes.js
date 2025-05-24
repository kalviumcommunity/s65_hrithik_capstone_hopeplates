const express = require("express")
const multer = require("multer")
const {
    createDonation,
    getAllDonations,
    getDonationById,
    updateDonationStatus,
    deleteDonation
} = require("../Controllers/donationController")
const { protect } = require("../middlewares/authMiddleware")

const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/donation_images/")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
})
const upload = multer({ storage })

router.post("/", protect, upload.array("images", 5), createDonation)
router.get("/", protect, getAllDonations)
router.get("/:id", protect, getDonationById)
router.put("/:id/status", protect, updateDonationStatus)
router.delete("/:id", protect, deleteDonation)

module.exports = router