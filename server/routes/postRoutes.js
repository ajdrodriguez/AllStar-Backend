const express = require("express");
const { requireSignIn } = require("../controllers/userController");
const {
  createPostController,
  getAllPostsController,
  getUserPostsController,
  deletePostController,
  updatePostController,
} = require("../controllers/postController");

// Router Object
const router = express.Router();

// Create a post || POST
router.post("/create-post", requireSignIn, createPostController);

// Get all posts
router.get("/get-all-posts", getAllPostsController);

// Get user posts
router.get("/get-user-posts", requireSignIn, getUserPostsController);

// Delete post
router.delete("/delete-post/:id", requireSignIn, deletePostController);

// Update post
router.put("/update-post/:id", requireSignIn, updatePostController);

module.exports = router;
