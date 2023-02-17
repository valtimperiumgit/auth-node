import mongoose from "mongoose";

const User = new mongoose.Schema<IUser>({
    name: {type: String, required: true},
    avatar: {type: String, required: false},
    email: {type: String, required: true},
    password: {type: String, required: true},
})

export default mongoose.model("User", User);

export interface IUser {
    _id: string,
    name: string,
    avatar: string,
    email: string,
    password: string, 
}