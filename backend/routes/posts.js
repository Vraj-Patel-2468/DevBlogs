const express = require("express");
const Router = express.Router();
const { 
  getPosts,
  createPost, 
  updatePost, 
  deletePost, 
  likePost
} = require("../controllers/posts");

Router.get("/", getPosts);
Router.post("/", createPost);
Router.patch("/:id", updatePost);
Router.delete("/:id", deletePost);
Router.patch("/:id/like", likePost);

module.exports = Router;
