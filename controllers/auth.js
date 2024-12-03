const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { json } = require("express");

exports.signIn = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json("User not found!");
    }
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      return res.status(401).json("Wrong credentials!");
    }
    const token = jwt.sign(
      { _id: user._id, username: user.name, email: user.email },
      "iamsecret",
      { expiresIn: "3d" }
    );
    const { password, ...info } = user._doc;
    return res.cookie("token", token).status(200).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);
    const newUser = new User({ name, email, password: hashedPassword });
    const savedUser = await newUser.save();
    return res.status(200).json(savedUser);
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.authMe = async (req, res) => {
  let userData = await User.findOne(req.userId);
  const { password, updatedAt, ...info } = userData._doc;
  // console.log(userData);
  res.status(200).json({ status: true, content: { data: info } });
};
