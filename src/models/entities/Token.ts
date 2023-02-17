import mongoose from "mongoose";

const Token = new mongoose.Schema({
    userId: {type: String, required: true},
    refreshToken: {type: String, required: true},
})

export default mongoose.model("Token", Token);