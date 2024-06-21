const {
  getUser,
  getUserFriends,
  addRemoveFriend,
  updateUser
} = require("../controllers/users");

const express = require("express");
const Router = express.Router();

Router.get("/:id", getUser);
Router.get("/:id/friends", getUserFriends);
Router.patch("/:id/:friendId", addRemoveFriend);
Router.patch("/:id", updateUser);

module.exports = Router;
