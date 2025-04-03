const express = require("express")
const {
    createRestaurant,
    getAllRestaurants,
    getRestaurantById,
    updateRestaurant,
    deleteRestaurant
} = require("../Controllers/restaurantController")

const router = express.Router()

router.post("/", createRestaurant)
router.get("/", getAllRestaurants)
router.get("/:id", getRestaurantById)
router.put("/:id", updateRestaurant)
router.delete("/:id", deleteRestaurant)

module.exports = router