const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const connectDB = require("./config/db")
const adminRoutes = require("./routes/adminRoutes")
const userRoutes = require("./routes/userRoutes")
const donationRoutes = require("./routes/donationRoutes")
const ngoRoutes = require("./routes/ngoRoutes")
const restaurantRoutes = require("./routes/restaurantRoutes")
const eventManagerRoutes = require("./routes/eventManagerRoutes")
const messageRoutes = require("./routes/messageRoutes");

dotenv.config()

const requiredEnvVars = ["MONGO_URI", "JWT_SECRET", "JWT_EXPIRES_IN", "PORT"]
requiredEnvVars.forEach((key) => {
    if (!process.env[key]) {
        console.error(`${key} is not defined in the environment variables.`)
        process.exit(1)
    }
})

const http = require('http');
const { Server } = require("socket.io");

const app = express()
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: [
            "http://localhost:5173",
            "https://s65-hrithik-capstone-hopeplates-1.onrender.com"
        ],
        credentials: true
    }
});

app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://s65-hrithik-capstone-hopeplates-1.onrender.com"
    ],
    credentials: true
}));

app.use(express.json())

connectDB()

app.use((req, res, next) => {
    req.io = io;
    next();
});

app.use("/api/admin", adminRoutes)
app.use("/api/users", userRoutes)
app.use("/api/donations", donationRoutes)
app.use("/api/ngos", ngoRoutes)
app.use("/api/restaurants", restaurantRoutes)
app.use("/api/event-managers", eventManagerRoutes)
app.use("/api/donations", donationRoutes)
app.use("/uploads", express.static("uploads"))
app.use("/api/messages", messageRoutes)

// Socket.io Logic
io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    socket.on("join_room", (userId) => {
        socket.join(userId);
        console.log(`User ${userId} joined room ${userId}`);
    });

    socket.on("send_message", (data) => {
        // data: { containerId (recipientId), senderId, message }
        io.to(data.recipientId).emit("receive_message", data);
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
    });
});

app.get("/", (req, res) => {
    res.send("Hope Plates API is running!");
});

const PORT = process.env.PORT || 5000;
if (!PORT) {
    console.error("PORT is not defined in the environment variables.")
    process.exit(1)
}

server.listen(PORT, (err) => {
    if (err) {
        console.error("Failed to start the server:", err.message)
        process.exit(1)
    }
    console.log(`Server is running at ${PORT}`)
})