const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const User = require('../models/userModel')
const colors = require('colors')

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/api/users/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {

        const newUser = {
          googleId: profile.id,
          name: profile._json.name,
          email: profile._json.email,
        }

        try {
          let user = await User.findOne({ email: profile._json.email })
          if (user) {
            console.log(user)
            done(null, user)
          } else {
            user = await User.create(newUser)
            console.log(user)
            done(null, user)
          }
        } catch (err) {
          console.error(err)
        }
      }
    )
  )

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user))
  })
}