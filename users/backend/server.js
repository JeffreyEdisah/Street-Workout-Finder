const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const connectDB = require('./config/db');
const passport = require('passport');
const { errorHandler } = require('./middleware/errorMiddleware');
const session = require('express-session');
const MongoStore = require('connect-mongo');

connectDB();

const app = express();

// Passport config

// Sessions
// Use express-session middleware
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({mongoUrl: process.env.MONGO_URI,}),
}))
  
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())
require('./config/passport')(passport);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`))