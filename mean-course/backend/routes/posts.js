const express = require('express');

const checkAuth = require('../middleware/check-auth');
const PostController = require('../controllers/posts');

const router = express.Router();


const extractFile = require("../middleware/file");

router.post("", checkAuth, extractFile, PostController.createPost );
  
router.delete("/:id", checkAuth, PostController.deletePost);

router.put('/:id', checkAuth, extractFile, PostController.updatePost);

router.get('/:id', PostController.getPost);

router.get("", PostController.getPosts);

module.exports = router;