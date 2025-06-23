const mongoose = require("mongoose")
const messageSchema = new mongoose.Schema({
    from:{type:mongoose.Schema.Types.ObjectId,ref:"User",Required:true},
    to:{type:mongoose.Schema.Types.ObjectId, ref:"user", Required:true},
    content:{type:Date, default:Date.now}
})

module.exports = mongoose.model("Message",messageSchema);
