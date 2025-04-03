const express = require("express")
const {
    createNGO,
    getAllNGOs,
    getNGOById,
    updateNGO,
    deleteNGO
} = require("../Controllers/ngoController")

const router = express.Router()

router.post("/", createNGO)
router.get("/", getAllNGOs)
router.get("/:id", getNGOById)
router.put("/:id", updateNGO)
router.delete("/:id", deleteNGO)

module.exports = router