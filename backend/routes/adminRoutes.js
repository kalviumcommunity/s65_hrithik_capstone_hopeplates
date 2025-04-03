const router = require("express").Router()
const {verifyNGO,verifyRestaurant,verifyEventManager,getPendingVerifications} = require("../Controllers/adminController")


router.put("/verify/ngo/:id", verifyNGO)

router.put("/verify/restaurant/:id", verifyRestaurant)

router.put("/verify/event-manager/:id", verifyEventManager)

router.get("/pending-verifications", getPendingVerifications)

module.exports = router