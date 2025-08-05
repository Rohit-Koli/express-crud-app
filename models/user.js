import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    age:Number,
    gender:String,
    phone:String,
    address:String,
    birthday:Date,
    userCreatedAt:String,
    userUpdatedAt:String,
    bio:String,
    hobbies:Array,
    skills:Array,
    image:String
})
const User = mongoose.model('User',userSchema)
export default User