const express = require("express")
const {
    createEventManager,
    getAllEventManagers,
    getEventManagerById,
    updateVerificationStatus,
    deleteEventManager
} = require("../Controllers/eventManagerController")

const router = express.Router()

router.post("/", createEventManager)
router.get("/", getAllEventManagers)
router.get("/:id", getEventManagerById)
router.put("/:id", updateVerificationStatus)
router.delete("/:id", deleteEventManager)

module.exports = router