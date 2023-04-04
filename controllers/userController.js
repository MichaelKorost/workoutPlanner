const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel.js");

// @desc    Register new user
// @route   POST /api/users/register
// @access  Public

const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password, passwordConfirmation } = req.body;

  if (!email || !password || !passwordConfirmation || !name) {
    res.status(401);
    throw new Error("Please fill all fields");
  }

  // validate email format
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    res.status(400);
    throw new Error("Email format is invalid");
  }

  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be at least 6 characters long");
  }

  if (password !== passwordConfirmation) {
    res.status(400);
    throw new Error("Passwords do not match");
  }

  //   check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //   create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      passwordConfirmation: user.passwordConfirmation,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public

const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // find user by email
  const user = await User.findOne({ email });

  // compare passwords
  const isMatch = await bcrypt.compare(password, user.password);
  if (user && isMatch) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("bad request, invalid credentials");
  }
});

// @desc    update user name
// @route   PUT /api/users/me
// @access  Private

const updateUserName = expressAsyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(401);
    throw new Error("Please enter a name");
  }

  // find user by id and update
  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    { name },
    { new: true } // To return the updated user document
  );

  if (!updatedUser) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    token: generateToken(updatedUser._id),
  });
});

// const updateUserName = expressAsyncHandler(async (req, res) => {
//   const { name } = req.body;

//   if (!name) {
//     res.status(401);
//     throw new Error("Please enter a name");
//   }

//   // find user by id
//   const user = await User.findById(req.user._id);

//   if (!user) {
//     res.status(404);
//     throw new Error("User not found");
//   }

//   user.name = name;
//   const updatedUser = await user.save();

//   res.status(200).json({
//     _id: updatedUser._id,
//     name: updatedUser.name,
//     email: updatedUser.email,
//     token: generateToken(updatedUser._id),
//   });
// });

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private

const getMe = expressAsyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, `${process.env.JWT_SECRET}`, {
    expiresIn: "30d",
  });
};

// @desc    Get all users
// @route   GET /api/users
// @access  Private

const getAllUsers = expressAsyncHandler(async (req, res) => {
  const users = await User.find({});
  if (users) {
    res.status(200).json(users);
  } else {
    res.status(404);
    throw new Error("404, no registered users found");
  }
});

module.exports = {
  registerUser,
  loginUser,
  getMe,
  getAllUsers,
  updateUserName,
};
