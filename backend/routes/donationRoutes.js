const express = require("express")
const {
    createDonation,
    getAllDonations,
    getDonationById,
    updateDonationStatus,
    deleteDonation
} = require("../Controllers/donationController")
const{protect} = require("../middlewares/authMiddleware")

const router = express.Router()

router.post("/", protect,createDonation)
router.get("/", protect, getAllDonations);
router.get("/:id",protect, getDonationById)
router.put("/:id/status",protect, updateDonationStatus)
router.delete("/:id",protect, deleteDonation)

module.exports = router