const postModel = require("../models/postModel");

const createPostController = async (req, res) => {
  try {
    const { category, title, description } = req.body;

    // Validation of Post
    if (!category || !title || !description) {
      return res.status(500).send({
        success: false,
        message: "Missing fields. Provide all information.",
      });
    }
    const post = await postModel({
      category,
      title,
      description,
      postedBy: req.auth._id,
    }).save();
    res.status(201).send({
      success: true,
      message: "Post created successfully.",
      post,
    });
    console.log(req);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Create Post API",
      error,
    });
  }
};

// Get all posts
const getAllPostsController = async (req, res) => {
  try {
    const posts = await postModel
      .find()
      .populate("postedBy", "_id name")
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "All data of posts received.",
      posts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get All Posts API",
      error,
    });
  }
};

// Get user's posts
const getUserPostsController = async (req, res) => {
  try {
    const userPosts = await postModel.find({ postedBy: req.auth._id });
    res.status(200).send({
      success: true,
      message: "User Posts successfully obtained.",
      userPosts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Get User Posts API",
      error,
    });
  }
};

// Delete Post
const deletePostController = async (req, res) => {
  try {
    const { id } = req.params;
    await postModel.findByIdAndDelete({ _id: id });
    res.status(200).send({
      success: true,
      message: "Post deleted successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Delete Post API",
      error,
    });
  }
};

// Update Post
const updatePostController = async (req, res) => {
  try {
    const { category, title, description } = req.body;

    // Post Find
    const post = await postModel.findById({ _id: req.params.id });

    // Validation of Post
    if (!category || !title || !description) {
      return res.status(500).send({
        success: false,
        message: "Missing fields. Provide all information.",
      });
    }
    const updatedPost = await postModel.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      {
        category: category || post?.category,
        title: title || post?.title,
        description: description || post?.description,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Post is updated successfully.",
      updatedPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Update Post API",
      error,
    });
  }
};

module.exports = {
  createPostController,
  getAllPostsController,
  getUserPostsController,
  deletePostController,
  updatePostController,
};
