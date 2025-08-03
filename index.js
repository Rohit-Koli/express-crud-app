//Es 6 Module Syntax
// import express from 'express';
import express from 'express';

//Common JS Module Syntax
// const express = require('express');

const app=express();
//Setting up the view engine to use EJS
app.set("view engine", "ejs");

// app.use((req,resp,next)=>{
app.use((req,resp,next)=>{
    console.log('Midlleware function called');
    next();
});

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

// app.use()

//Simple route to respond with 'Hello Worlds'
app.get('/welcome',(req,resp)=>{
    // resp.send(response.json({
    //     message: 'Hello Worlds'
    // }));
    // resp.json({
    //     message: 'Hello Worlds'
    // });

    resp.send('Hello Rohit ');
})

//Route with a parameter name 
// http://localhost:3000/hello/abc
app.get('/hello/:name',(req,resp)=>{
    var name =req.params.name
    resp.send(`Hello ${name}`)
    console.log(`Hello ${name}`);
})

//Route with query parameters
//http://localhost:3000/login/admin/1234
app.get('/login/:username/:password',(req,resp)=>{
    var username = req.params.username;
    var password = req.params.password;
    
    // Here you can add logic to validate the username and password
    if(username === 'admin' && password === '1234') {
        resp.send(`Welcome ${username+" "+password}`);
    } else {
        resp.status(401).send('Unauthorized');
    }
})

app.get('/',(req,resp)=>{
    resp.render('index',{name:'XYZ',age:25,city:'New York'});
})

app.get('/about',(req,resp)=>{
    resp.render('about',{name:'XYZ',age:25,city:'New York'});
})

//Creating a simple crud APplication 

var user=[]
var idCounter = 0;

app.post('/setUser', (req, resp) => {
    const userData = { id: idCounter++, ...req.body };
    user.push(userData);
    resp.status(201).json({
        message: 'User created successfully',
        user: userData
    });
});

// app.get('/getUser/:id',(req,resp)=>{
app.get('/getUser', (req, resp) => {
    // Example URL: http://localhost:3000/getUser?id=1
    const userId = req.query.id;
    const userFound = user.find(u => u.id === parseInt(userId));

    if (userFound) {
        resp.status(200).json({
            message: 'User found',
            user: userFound
        });
        // ✅ Removed second `resp.send()`
    } else {
        resp.status(404).json({
            message: 'User not found'
        });
    }
});

app.delete('/deleteUser',(req,resp)=>{
    const userId = req.query.id;
    const userIndex = user.findIndex(u => u.id === parseInt(userId));

    if (userIndex !== -1) {
        user.splice(userIndex, 1);
        resp.status(200).json({
            message: 'User deleted successfully'
        });
    } else {
        resp.status(404).json({
            message: 'User not found'
        });
    }
})

app.put('/updateUser',(req,resp)=>{
    const userId = req.query.id;
    const userIndex = user.findIndex(u => u.id === parseInt(userId));

    if (userIndex !== -1) {
        user[userIndex] = { ...user[userIndex], ...req.body };
        resp.status(200).json({
            message: 'User updated successfully',
            user: user[userIndex]
        });
    } else {
        resp.status(404).json({
            message: 'User not found'
        });
    }
});
//Starting the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});