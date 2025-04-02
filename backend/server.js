const express = require("express")
const dotenv = require("dotenv")
const connectDB = require("./config/db")

dotenv.config()

const app = express()

app.use(express.json())

connectDB()

const PORT = process.env.PORT
if (!PORT) {
    console.error("PORT is not defined in the environment variables.")
    process.exit(1);
}

app.listen(PORT, (err) => {
    if (err) {
        console.error("Failed to start the server:", err.message)
        process.exit(1);
    }
    console.log(`Server is running at ${PORT}`)
})