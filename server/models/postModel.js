const mongoose = require("mongoose");

// Post Schema
const postSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: [true, "Please add a title."],
    },
    description: {
      type: String,
      required: [true, "Please add a description."],
    },
    image: {
      type: String,
      required: [true, "Please upload an image for validation."],
    },
    postedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
