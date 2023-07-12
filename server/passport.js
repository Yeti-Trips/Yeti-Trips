const express = require('express');
const dotenv = require('dotenv');
const passport = require('passport');
//load environment variables from .env file
dotenv.config();
const {OAuth2Client} = require('google-auth-library');
// process.env.CLIENT_ID,
// process.env.CLIENT_SECRET

const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
  clientID: "675806936485-hnn3n904n9ofgg9pqg599oqnn1ja2f5r.apps.googleusercontent.com",
  clientSecret: "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",
  callbackURL: "/server/oauth/google/callback",
  scope: ['profile']
},
//replace with to make work again w/o database
// function verify(issuer, profile, cb) {
//   done(null, profile);
//   }
function verify(issuer, profile, cb) {
  db.query('SELECT * FROM federated_credentials WHERE provider = $1 AND subject = $2', [
    issuer,
    profile.id
  ], function(err, result) {
    if (err) { return cb(err); }
    if (result.rows.length === 0) {
      db.query('INSERT INTO users (name) VALUES ($1) RETURNING id', [
        profile.displayName
      ], function(err, result) {
        if (err) { return cb(err); }

        var id = result.rows[0].id;
        db.query('INSERT INTO federated_credentials (user_id, provider, subject) VALUES ($1, $2, $3)', [
          id,
          issuer,
          profile.id
        ], function(err) {
          if (err) { return cb(err); }
          var user = {
            id: id,
            name: profile.displayName
          };
          return cb(null, user);
        });
      });
    } else {
      var user_id = result.rows[0].user_id;
      db.query('SELECT * FROM users WHERE id = $1', [ user_id ], function(err, result) {
        if (err) { return cb(err); }
        if (result.rows.length === 0) { return cb(null, false); }
        return cb(null, result.rows[0]);
      });
    }
  });
}));

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