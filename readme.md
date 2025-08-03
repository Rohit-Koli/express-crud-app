### We Create a Server with like this 

Node V/S Express - Node is the main thing , with the hepl of express we can write a server code 
and express also use the HTTP Server of node but express server is code is lot more easy than the normal HTTP Server code 

What is Express ?
    Express is a small and fast web server for Node.js that helps you:

    👉 Easily build websites and APIs.
    👉 Handle things like routing (which page to show for which URL).
    👉 Send data to and from your website or app.

Example:
    If Node.js is the engine, Express is like the driver that helps you control where things go and how they work.

    It saves you time by giving tools so you don’t have to build everything from scratch.

### What is Middleware ?
    Middleware in Express is a function that runs between the request from the user and the final response from the server.

    Think of it like:
    A security check or helper that runs before sending the final reply.

    What it can do:
        Check if a user is logged in

        Log request details

        Modify the request or response

        Handle errors

    So, middleware is like a checkpoint that helps you do something with the request before sending the final result.

### Whats is Request , Response and Next
    ✅ Request (req)
    This is what the user sends to the server — like:

        "I want to open this page"

        "Here’s my username and password"

        "Please give me some data"

    It includes:

        URL
        Method (GET, POST, etc.)
        Data (like form input)
        Headers
    
    ✅ Response (res)
    This is what the server sends back to the user — like:

        A web page
        A success message
        Some data in JSON
        An error message
    
    ✅ Next (next)

    ✅ Request (req)

    next is a function used in middleware to move to the next step.
    When you're using middleware in Express, you need to call next() so Express knows you're done with this step and it should go to the next middleware or final route.

    Imagine this:
    You have 3 security guards (middleware).
    Each one checks something and then says,
    “Okay, go to the next person.” ← That’s what next() does.

    So, next() is like saying “I’m done here, go ahead.”

### Route Parameters

    Route parameters are variables in the URL that allow you to capture values sent by the user in the URL path.

    They are used to make routes dynamic.

## What is EJS ?

### 🔷 What is EJS?

**EJS (Embedded JavaScript)** is a **template engine** for Node.js that lets you write **HTML with JavaScript code inside it**.

It helps you:

* Show dynamic content in HTML
* Use loops, conditions, variables in your views
* Separate design (HTML) from logic (JavaScript)

---

### 💡 Example:

**`index.ejs`**

```ejs
<h1>Welcome, <%= name %>!</h1>
```

In the route:

```js
res.render("index", { name: "Rohit" });
```

👆 This will show:

```
Welcome, Rohit!
```

---

### 🔧 How to Configure EJS in Express

1. **Install EJS**

```bash
npm install ejs
```

2. **Set view engine in Express**

```js
const express = require("express");
const app = express();

app.set("view engine", "ejs");
```

3. **Create a `views/` folder**
   Put your `.ejs` files (like `index.ejs`) inside this folder.

4. **Use `res.render()` to show the EJS file**

```js
app.get("/", (req, res) => {
  res.render("index", { name: "Rohit" });
});
```

---

### ✅ Summary:

* **EJS** = HTML + JavaScript
* Used to create dynamic pages
* Easy to set up with Express using `.set("view engine", "ejs")`
* Files go in the `views` folder

Let me know if you want a full working example.



