const { User } = require("../models/User");

// Get User Profile
const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get User Friends

const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstname, lastname, occupation, location, picturePath }) => {
        return { _id, firstname, lastname, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  }
  catch(err) {
    res.status(500).json({ error: err.message });
  }
};

// Add Remove Friend

const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if(user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    }
    else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstname, lastname, occupation, location, picturePath }) => {
        return { _id, firstname, lastname, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  }
  catch(err) {
    res.status(500).json({ error: err.message });
  }
};

// Update User

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstname, lastname, location, occupation, picturePath } = req.body;
    const user = await User.findById(id);
    if(firstname) user.firstname = firstname;
    if(lastname) user.lastname = lastname;
    if(location) user.location = location;
    if(occupation) user.occupation = occupation;
    if(picturePath) user.picturePath = picturePath;
    await user.save();
    res.status(200).json(user);
  }
  catch(err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getUser, getUserFriends, addRemoveFriend, updateUser };
