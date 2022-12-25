const asyncHandler = require('express-async-handler')
const User = require('../models/userModel.js')

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    res.status(200).send("register user")
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    res.status(200).send("login user")
})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).send("Get user Data")
})

module.exports = {
  registerUser,
  loginUser,
  getMe,
}