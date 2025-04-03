const express = require("express")
const {
    createDonation,
    getAllDonations,
    getDonationById,
    updateDonationStatus,
    deleteDonation
} = require("../Controllers/donationController")

const router = express.Router()

router.post("/", createDonation)
router.get("/", getAllDonations)
router.get("/:id", getDonationById)
router.put("/:id", updateDonationStatus)
router.delete("/:id", deleteDonation)

module.exports = router