const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const { protect } = require("../middlewares/authMiddleware");

router.post("/", protect, async (req, res) => {
    const { to, content } = req.body;
    const message = await Message.create({ from: req.user.id, to, content });
    res.json(message);
});


router.get("/:userId", protect, async (req, res) => {
    const userId = req.params.userId;
    const messages = await Message.find({
        $or: [
        { from: req.user.id, to: userId },
        { from: userId, to: req.user.id }
        ]
    }).sort({ timestamp: 1 });
    res.json(messages);
});

router.get("/conversations", protect, async (req, res) => {
    const userId = req.user.id;
    const messages = await Message.find({
        $or: [{ from: userId }, { to: userId }]
    }).sort({ timestamp: -1 });
    const usersMap = {};
    messages.forEach(msg => {
        const otherUser = msg.from.toString() === userId ? msg.to : msg.from;
        if (!usersMap[otherUser]) {
            usersMap[otherUser] = {
                user: otherUser,
                lastMessage: msg
            };
        }
    });
    const result = await Promise.all(
        Object.values(usersMap).map(async conv => {
            const user = await User.findById(conv.user);
            return {
                user,
                lastMessage: conv.lastMessage
            };
        })
    );

    res.json(result);
});

module.exports = router;