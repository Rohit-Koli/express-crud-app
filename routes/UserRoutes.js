import express from 'express'
import {
    getUserById,
    setUser,
    deleteUser,
    updateUser,
    getAllUsers} 
    from '../controllers/UserController.js' //Importing all the functions of out  User Controller
import upload from '../middlewares/upload.js'
const router=express.Router() 
/*
    ✅ const router = express.Router();
    This line creates a mini Express app (router) that lets you define route handlers in a modular way, separate from the main app.

    It’s used to group related routes together, like all /users routes, or all /products routes, etc.

    🧠 Think of it like this:
    express() → creates the main application

    express.Router() → creates a sub-router, like a module inside the main app
*/

router.post('/setUser', upload.single('image'), setUser)
router.get('/getUser',getUserById)
router.get('/getUsers',getAllUsers)
router.delete('/deleteUser',deleteUser)
router.put('/updateUser', upload.single('image'), updateUser);

export default router