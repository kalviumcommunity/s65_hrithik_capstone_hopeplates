const express = require("express")
const dotenv = require("dotenv")
const connectDB = require("./config/db")
const adminRoutes = require("./routes/adminRoutes")
const userRoutes = require("./routes/userRoutes")
const donationRoutes = require("./routes/donationRoutes")
const ngoRoutes = require("./routes/ngoRoutes")
const restaurantRoutes = require("./routes/restaurantRoutes")
const eventManagerRoutes = require("./routes/eventManagerRoutes")

dotenv.config()

const app = express()

app.use(express.json())

connectDB()

app.use("/api/admin", adminRoutes)
app.use("/api/users", userRoutes)
app.use("/api/donations", donationRoutes)
app.use("/api/ngos", ngoRoutes)
app.use("/api/restaurants", restaurantRoutes)
app.use("/api/event-managers", eventManagerRoutes)

const PORT = process.env.PORT
if (!PORT) {
    console.error("PORT is not defined in the environment variables.")
    process.exit(1)
}

app.listen(PORT, (err) => {
    if (err) {
        console.error("Failed to start the server:", err.message)
        process.exit(1)
    }
    console.log(`Server is running at ${PORT}`)
})