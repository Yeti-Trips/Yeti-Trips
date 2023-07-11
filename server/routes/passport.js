const express = require('express');
const dotenv = require('dotenv');
const passport = require('passport');
dotenv.config();
const {OAuth2Client} = require('google-auth-library');
// process.env.CLIENT_ID,
// process.env.CLIENT_SECRET

const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "http://www.example.com/auth/google/callback"
},
function(accessToken, refreshToken, profile, done) {
  done(null, profile);
  //change to sql query
  // User.findOrCreate({ googleId: profile.id }, function (err, user) {
  //   return cb(err, user);
  //
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null,user);
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