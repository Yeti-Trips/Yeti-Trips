const express = require('express');
const dotenv = require('dotenv');
const passport = require('passport');
//load environment variables from .env file
dotenv.config();
const {OAuth2Client} = require('google-auth-library');
const db = require('./db'); //connect to database

// process.env.CLIENT_ID,
// process.env.CLIENT_SECRET

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;

//Google strategy
passport.use(new GoogleStrategy({
  clientID: "675806936485-hnn3n904n9ofgg9pqg599oqnn1ja2f5r.apps.googleusercontent.com",
  clientSecret: "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",
  callbackURL: "/server/oauth/google/callback",
  scope: ['https://www.googleapis.com/auth/userinfo.profile', 'email']
},

function (accessToken, refreshToken, profile, cb) {
  // console.log('profile: ', profile);
  db.query('SELECT * FROM users WHERE email = $1', [profile.emails[0].value], function(err, result) {
    if (err) { return cb(err); }
    if (result.rows.length === 0) {
      // User does not exist, insert a new user
      const newUser = {
        email: profile.emails[0].value,
        userpassword: '', // Set the password according to your requirements
        firstname: profile.name.givenName,
        lastname: profile.name.familyName,
        avatarimage: '' // Set the avatar image path or URL
      };

      db.query('INSERT INTO users (email, userpassword, firstname, lastname, avatarimage) VALUES ($1, $2, $3, $4, $5) RETURNING userid', [
        newUser.email,
        newUser.userpassword,
        newUser.firstname,
        newUser.lastname,
        newUser.avatarimage
      ], function(err, result) {
        if (err) { return cb(err); }
        console.log('user created')
        var user = {
          id: result.rows[0].userid,
          name: newUser.firstname + ' ' + newUser.lastname
        };
        return cb(null, user);
      });
    } else {
      // User exists, return the user
      console.log('user exists');
      var user = {
        id: result.rows[0].userid,
        name: result.rows[0].firstname + ' ' + result.rows[0].lastname
      };
      return cb(null, user);
    }
  });
}
));

//Local strategy
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
function verify(email, password, done) {
  db.query('SELECT * FROM users WHERE email = $1', [email], function(err, result) {
    if (err) { return done(err); }
    if (result.rows.length === 0) { return done(null, false, { message: 'Incorrect username or password.'}) }

    //check username password against hashed password
    const user = result.rows[0];
    user.id = user.userid;
    const hashedPassword = user.userpassword
    // change to this when encryption is made: bcrypt.compareSync(password, hashedPassword)
    if (hashedPassword === password) {
      console.log('passwords match')
      return done(null, user);
    }
    return done(null, false, { message: 'Incorrect username or password.'})
  })
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // Replace this with your database query to fetch the user based on the ID
  db.query('SELECT * FROM users WHERE userid = $1', [id], function(err, result) {
    if (err) { return done(err); }
    if (result.rows.length === 0) { return done(null, false); }
    return done(null, result.rows[0]);
  });
});






