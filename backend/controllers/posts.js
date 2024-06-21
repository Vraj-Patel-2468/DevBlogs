const { User } = require("../models/User");
const { Post } = require("../models/Post");

// Get Posts

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create Post

const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstname,
      lastName: user.lastname,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: []
    });
    await newPost.save();
    const posts = await Post.find();
    res.status(201).json(posts);
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Post

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, picturePath } = req.body;
    const post = await Post.findById(id);
    post.description = description;
    post.picturePath = picturePath;
    await post.save();
    const posts = await Post.find();
    res.status(200).json(posts);
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 

// Delete Post

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndDelete(id);
    const posts = await Post.find();
    res.status(200).json(posts);
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Like Post

const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);
    if(isLiked) {
      post.likes.delete(userId);
    }
    else {
      post.likes.set(userId, true);
    }
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );
    res.status(200).json(updatedPost);
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getPosts, createPost, updatePost, deletePost, likePost };