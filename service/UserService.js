import User from "../models/user.js";

export const createUser=async(userData)=>{
  const user= new User(userData)
  return await user.save();
}

export const getAllUsers=async ()=>{
  return await User.find()
}

export const deleteUserById=async (id)=>{
  return await User.findByIdAndDelete(id)
}

export const updateUserById=async (id,data)=>{
  return await User.findByIdAndUpdate(id,data,{new:true})
}

export const getUserById=async(id)=>{
  return await User.findById(id);
}