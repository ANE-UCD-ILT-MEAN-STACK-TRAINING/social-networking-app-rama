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
      "GET, POST, PUT, PATCH, DELETE, OPTIONS"
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
    post.save().then(createdPost => {
      res.status(201).json({
        message: "Post added successfully",
        postId: createdPost._id
      });
    });
  });
  



  //app.get();
  //app.put();
  //app.delete();

app.get("/api/posts", (req, res, next) => {
  Post.find().then((documents) => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: documents,
    });
  });
});

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Post deleted!" });
  });
});

app.put('/api/posts/:id', (req, res, next) => {
    const post = new Post({
      _id: req.body.id,
      title: req.body.title,
      content: req.body.content
  });
    Post.updateOne({_id: req.params.id}, post)
    .then(updatedPost => {
    res.status(201).json({
    message: 'Post Added !!',
    postId: updatedPost._id
    });
  });
});

app.get('/api/posts/:id', (req, res, next) => {
  Post.findById(req.params.id)
  .then(post => {
    if(post){
      res.status(200).json(post);
      }
      else{
      res.status(404).json({
      message: 'post not found'
      });
    }
  });
});
        

module.exports = app;
