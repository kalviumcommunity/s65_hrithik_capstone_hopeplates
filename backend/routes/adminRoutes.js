const router = require("express").Router()
const {verifyNGO,deleteUser,verifyRestaurant,verifyEventManager,getPendingVerifications, verifyUser} = require("../Controllers/adminController")
const { adminOnly,protect } = require("../middlewares/authMiddleware")

router.get("/pending-verifications", protect, adminOnly, getPendingVerifications)
router.put("/verify/ngo/:id", protect, adminOnly, verifyNGO)
router.put("/verify/restaurant/:id", protect, adminOnly, verifyRestaurant)
router.put("/verify/event-manager/:id", protect, adminOnly, verifyEventManager)
router.put("/verify/user/:id", protect, adminOnly, verifyUser)
router.delete("/reject/user/:id", protect, adminOnly, deleteUser)

module.exports = router