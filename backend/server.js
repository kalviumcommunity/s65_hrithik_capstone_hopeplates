const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors") // Import cors
const connectDB = require("./config/db")
const adminRoutes = require("./routes/adminRoutes")
const userRoutes = require("./routes/userRoutes")
const donationRoutes = require("./routes/donationRoutes")
const ngoRoutes = require("./routes/ngoRoutes")
const restaurantRoutes = require("./routes/restaurantRoutes")
const eventManagerRoutes = require("./routes/eventManagerRoutes")

dotenv.config()

const requiredEnvVars = ["MONGO_URI", "JWT_SECRET", "JWT_EXPIRES_IN", "PORT"]
requiredEnvVars.forEach((key) => {
    if (!process.env[key]) {
        console.error(`${key} is not defined in the environment variables.`)
        process.exit(1)
    }
})

const app = express()

app.use(cors({
    origin: "http://localhost:5173", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true 
}))

app.use(express.json())

connectDB()

app.use("/api/admin", adminRoutes)
app.use("/api/users", userRoutes)
app.use("/api/donations", donationRoutes)
app.use("/api/ngos", ngoRoutes)
app.use("/api/restaurants", restaurantRoutes)
app.use("/api/event-managers", eventManagerRoutes)
app.use("/uploads", express.static("uploads"))

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