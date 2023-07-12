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

passport.use(new GoogleStrategy({
  clientID: "675806936485-hnn3n904n9ofgg9pqg599oqnn1ja2f5r.apps.googleusercontent.com",
  clientSecret: "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",
  callbackURL: "/server/oauth/google/callback",
  scope: ['https://www.googleapis.com/auth/userinfo.profile', 'email']
},
//replace with to make work again w/o database
// function verify(issuer, profile, cb) {
//   done(null, profile);
//   }
function (accessToken, refreshToken, profile, cb) {
  console.log('profile: ', profile);
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
      console.log(user);
      return cb(null, user);
    }
  });
}
));

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

// async function getUserData(accessToken) {
//   const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`);
//   const data = await response.json();
//   console.log('data: ', data);

// }

// router.get('/', async function(req, res, next) {
//   const code = req.query.code;
//   console.log('code: ', code);
//   try {
//     const redirectUrl = 'http://localhost:3000/home';
//     const oAuth2Client = new OAuth2Client(
//       process.env.CLIENT_ID,
//       process.env.CLIENT_SECRET,
//       redirectUrl
//     );
//     const res = await oAuth2Client.getToken(code);
//     await oAuth2Client.setCredentials(res.tokens);
//     console.log('Tokens acquired');
//     const user = oAuth2Client.credentials;
//     console.log('credentials: ', user);
//     await getUserData(user.access_token);
//   }catch(err){
//     console.log('error with signing in with Google: ', err)
//   }
// });