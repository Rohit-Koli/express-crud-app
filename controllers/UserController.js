import express from 'express';
import * as service from '../service/UserService.js';

// CREATE USER
export const setUser = async (req, res) => {
  try {
    let {
      name,
      email,
      age,
      gender,
      phone,
      address,
      birthday,
      bio,
      hobbies,
      skills,
    } = req.body;

    // Parse arrays if passed as strings
    hobbies = typeof hobbies === 'string' ? JSON.parse(hobbies) : hobbies;
    skills = typeof skills === 'string' ? JSON.parse(skills) : skills;

    const userData = {
      name,
      email,
      age,
      gender,
      phone,
      address,
      birthday,
      bio,
      hobbies,
      skills,
      image: req.file ? req.file.filename : null,
      userCreatedAt: new Date().toISOString(),
      userUpdatedAt: new Date().toISOString(),
    };

    const user = await service.createUser(userData);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET SINGLE USER
export const getUserById = async (req, res) => {
  try {
    const userDetails = await service.getUserById(req.query.id);
    if (!userDetails) {
      return res.status(404).json({ message: 'User Not Found' });
    }
    res.status(200).json(userDetails);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// GET ALL USERS
export const getAllUsers = async (req, res) => {
  try {
    const users = await service.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE USER
export const updateUser = async (req, res) => {
  try {
    const updatedData = {
      ...req.body,
      userUpdatedAt: new Date().toISOString(),
    };

    // Parse arrays if passed as strings
    if (updatedData.hobbies && typeof updatedData.hobbies === 'string') {
      updatedData.hobbies = JSON.parse(updatedData.hobbies);
    }

    if (updatedData.skills && typeof updatedData.skills === 'string') {
      updatedData.skills = JSON.parse(updatedData.skills);
    }

    if (req.file) {
      updatedData.image = req.file.filename;
    }

    const user = await service.updateUserById(req.query.id, updatedData);
    if (!user) return res.status(404).json({ message: 'User Not Found' });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE USER
export const deleteUser = async (req, res) => {
  try {
    const isPresent = await service.deleteUserById(req.query.id);
    if (!isPresent) {
      return res.status(404).json({ message: 'User Not Found' });
    }
    res.status(200).json({ message: 'User Deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
