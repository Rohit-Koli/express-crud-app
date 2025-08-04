//Creating a simple crud Application 
import express from 'express'
import * as service from '../service/UserService.js'


// Create a new user
export const setUser = async (req, resp) => {
    try {
        const userData = {
            ...req.body,
            image: req.file ? req.file.filename : null
        };
        const user = await service.createUser(userData);
        resp.status(200).json(user);
    } catch (error) {
        resp.status(500).json({ error: error.message });
    }
};

// Get user by ID (query param ?id=)
export const getUserById = async (req, resp) => {
    try {
        const userDetails= await service.getUserById(req.query.id)
        resp.status(200).json(userDetails)
    } catch (error) {
        resp.status(404).json({
            error:error.message
        })
    }
};

// Delete user by ID (query param ?id=)
export const deleteUser =async (req, resp) => {
    try {
        const isPresent=await service.deleteUserById(req.query.id)
        if(!isPresent){
            return resp.status(404).json({message:'User Not Found'})
        }
        resp.json({message:'User Deleted'})
    } catch (error) {
        resp.status(404).json({error:error.message})
    }
};

// Update user by ID (query param ?id=)
export const updateUser = async (req, resp) => {
  try {
    const updatedData = { ...req.body };

    // If image file is uploaded, add filename to data
    if (req.file) {
      updatedData.image = req.file.filename;
    }

    const user = await service.updateUserById(req.query.id, updatedData);

    if (!user) return resp.status(404).json({ message: 'User Not Found' });

    resp.json(user);
  } catch (error) {
    resp.status(500).json({
      error: error.message,
    });
  }
};

export const getAllUsers= async (req,resp)=>{
    try {
        const users= await service.getAllUsers()
        resp.json(users)
    } catch (error) {
        resp.json({
            error:error.message
        })
    }
}