const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Post = require("./models/post");

const mongoose = require("mongoose");

mongoose
  .connect(
    //"mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false"
    "mongodb://localhost:27017/MyPosts?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  }); 




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
  });
  
  //app.post() without MongoDB Intergration using Mongoose.
  /*app.post("/api/posts", (req, res, next) => {

    console.log("Inside Post API in app.js");
    
    const post = req.body;
    console.log(req.body);

    // we still need to send the response as we dont want client be waiting and timeout
    res.status(201).json({
      message: "Post added successfully",
    });
  
  });*/


  app.post("/api/posts", (req, res, next) => {
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
    });
    console.log(req.body);
    console.log("Before Save ...");
    post.save();
    console.log("After Save WIth ID...");
    console.log(post);
    res.status(201).json({
      message: "Post added successfully",
    });
  });
  



  //app.get();
  //app.put();
  //app.delete();

app.get("/api/posts", (req, res, next) => {
  
  const posts = [
    {
      id: "fadf12421l",
      title: "First server-side post",
      content: "This is coming from the server",
    },
    {
      id: "ksajflaj132",
      title: "Second server-side post",
      content: "This is coming from the server!",
    },
  ];

  res.status(200).json({
    message: "Posts fetched succesfully!",
    posts: posts,
  });
});

module.exports = app;
