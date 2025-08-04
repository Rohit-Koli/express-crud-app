import express from 'express'
import userRoutes from './routes/UserRoutes.js'  //Importing Our User Routes Page
import connectDB from './config/db.js'
import cors from 'cors'
const app=express()

connectDB()

app.use(cors())
app.use('/uploads', express.static('uploads')); //for storing images
app.use(express.json())

app.use('/user',userRoutes)

app.listen(3000,()=>{
    console.log('App is Running !');
    
})