const express = require('express')
const router = express.Router()
const passport = require('passport')
const {
  registerUser,
  loginUser,
  getMe,
  generateToken
} = require('../controllers/userController.js')
const { protect } = require('../middleware/authMiddleware.js')
const colors = require('colors')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)

router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/api/users/login' }),
  function(req, res) {
    let user = req.user
    // res.status(200).json({
    //   _id: user.id,
    //   name: user.name,
    //   email: user.email,
    //   token: generateToken(user.id) 
    // })

    res.redirect("http://localhost:3000/SuccessfulGoogleLogin?id=" + user.id + "&name=" + user.name + "&email=" + user.email +  "&token=" + generateToken(user.id))

  });

module.exports = router