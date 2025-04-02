const Restaurant = require("../models/Restaurant")

exports.createRestaurant = async (req, res) => {
    try {
        const { name, email, location, contactNumber } = req.body
        const restaurant = new Restaurant({
            name,
            email,
            location,
            contactNumber
        })
        await restaurant.save()
        res.status(201).json({ message: "Restaurant created successfully", restaurant })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.getAllRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.find()
        res.status(200).json(restaurants)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.getRestaurantById = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id)
        if (!restaurant) return res.status(404).json({ message: "Restaurant not found" })
        res.status(200).json(restaurant)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.updateRestaurant = async (req, res) => {
    try {
        const { name, email, location, contactNumber } = req.body
        const restaurant = await Restaurant.findByIdAndUpdate(
            req.params.id,
            { name, email, location, contactNumber },
            { new: true }
        )
        if (!restaurant) return res.status(404).json({ message: "Restaurant not found" })
        res.status(200).json({ message: "Restaurant updated successfully", restaurant })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.deleteRestaurant = async (req, res) => {
    try {
        const restaurant = await Restaurant.findByIdAndDelete(req.params.id)
        if (!restaurant) return res.status(404).json({ message: "Restaurant not found" })
        res.status(200).json({ message: "Restaurant deleted successfully" })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}