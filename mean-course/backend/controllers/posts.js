const express = require('express');
const multer = require("multer");
const Post = require('../models/post');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();

const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg"
  };

  

exports.createPost = 
    (req, res, next) => {
      const url = req.protocol + "://" + req.get("host");
      console.log("Req header in posts.js");
      console.log(req.headers);
      console.log("Req body in posts.js");
      console.log(req.body);
      console.log("Req userData in posts.js");
      console.log(req.userData);
      const post = new Post({
        title: req.body.title,
        content: req.body.content,
        imagePath: url + "/images/" + req.file.filename,
        creator: req.userData.userId
      });
      console.log("Post Object Before storing in DB...");
      console.log(post);
      post.save().then(createdPost => {
        res.status(201).json({
          message: "Post added successfully",
          post: {
            ...createdPost,
            id: createdPost._id
          }
          
        });
      console.log("After save The post id from DB is " + createdPost._id);
      }).catch(error => {
        res.status(500).json({
          message: "Creating a post failed!"
        });
      });

    }
  
  
  

/*router.post("", (req, res, next) => {
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
  });*/
  

exports.getPosts = (req, res, next) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    let fetchedPosts;
    console.log(pageSize);
    console.log(currentPage);
  
    const postQuery = Post.find();
  
    // if inputs are valid
    if (pageSize && currentPage) {
      postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }
  
    postQuery
      .find()
      .then((documents) => {
        fetchedPosts = documents;
        console.log("Fetched Posts " + fetchedPosts);
        return Post.count();
      })
      .then((count) => {
        res.status(200).json({
          message: "Posts fetched successfully!",
          posts: fetchedPosts,
          maxPosts: count,
        });
      }).catch(error => {
        res.status(500).json({
          message: "Failed fetching posts!"
        });
      });
;
  }

  
exports.deletePost = (req, res, next) => {
  Post.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then((result) => {
    console.log(result);
    if(result.n > 0)  {
      res.status(200).json({ message: "Delete successful!" });
    } else {
      res.status(401).json({ message: "Not authorized!" });
    }
    //res.status(200).json({ message: "Post deleted!" });
  }).catch(error => {
    res.status(500).json({
      message: "Deleting post failed!"
    });
  });

}

/*router.put('/:id', (req, res, next) => {
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
});*/

exports.updatePost = (req, res, next) => {

    let imagePath = req.body.imagePath;
    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      imagePath = url + "/images/" + req.file.filename
    }

    const post = new Post({
      _id: req.body.id,
      title: req.body.title,
      content: req.body.content,
      imagePath: imagePath,
      creator: req.userData.userId
  });
  console.log("Post Object in NodeJS server before update to DB... ");
  console.log(post);
    Post.updateOne({_id: req.params.id, creator: req.userData.userId}, post)
    .then(updatedPost => {
      console.log(updatedPost);
      if(updatedPost.nModified > 0)  {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
      /*res.status(201).json({
      message: 'Post Added !!',
      postId: updatedPost._id
      });*/
    }).catch(error => {
      res.status(500).json({
        message: "Couldn't update the post!"
      });
    });
}

exports.getPost = (req, res, next) => {
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
}
        

