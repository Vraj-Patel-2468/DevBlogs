const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/User");

//Register User

const register = async (req, res) => {
  console.log("registering user");
  try {
    const {
      firstname,
      lastname,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstname,
      lastname,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      //TODO: Add viewedProfile and impressions functionality later on. Currently assigning random values.
      viewedProfile: Math.floor(Math.random() * 10000), 
      impressions: Math.floor(Math.random() * 10000), 
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Login User

const login = async (req, res) => {
  try{
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if(!user) return res.status(400).json({ msg: "User does not exist." });
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(400).json({ msg: "Invalid credentials." });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  }
  catch(err){
    res.status(500).json({ error: err.message });
  }
};

module.exports = { register, login };