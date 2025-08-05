import express from 'express'
import userRoutes from './routes/UserRoutes.js'  //Importing Our User Routes Page
import connectDB from './config/db.js'
import cors from 'cors'
const app=express()
var PORT = process.env.PORT || 3000
connectDB()

//Solving CORS issue
app.use(cors())
app.use('/uploads', express.static('uploads')); //for storing images
//Middleware to parse JSON data
app.use(express.json())
//Using User Routes
app.use('/user',userRoutes)
//Starting the server
app.listen(PORT,()=>{
    console.log('App is Running !');    
})