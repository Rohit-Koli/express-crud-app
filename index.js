import express from 'express'
import userRoutes from './routes/UserRoutes.js'  //Importing Our User Routes Page
import connectDB from './config/db.js'
const app=express()

connectDB()

app.use(express.json())

app.use('/user',userRoutes)

app.listen(3000,()=>{
    console.log('App is Running !');
    
})