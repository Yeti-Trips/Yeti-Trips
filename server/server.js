const express = require('express');
const cookieSession = require('cookie-session');
const app = express();
const path = require('path');
const cors = require('cors');
const passportSetup = require('./routes/passport.js');
const oauthRoute = require('./routes/oauth.js');
// const apiRouter = require('./routes/api.js');

app.use(
  cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  })
)
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,POST,PUT,DELETE',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//connect to local database


// app.use('/api', apiRouter);

app.use('/oauth', oauthRoute);

if (process.env.NODE_ENV === 'development') {
  console.log(process.env.NODE_ENV);
  // statically serve everything in the build folder on the route '/dist'
  app.use('/dist', express.static(path.join(__dirname, '../dist')));
  // serve index.html on the route '/'
  app.get('/*', (req, res) => {
    console.log('dev request')
    return res.status(200).sendFile(path.join(__dirname, '../src/index.html'));
  });
}
else {
  console.log('entered prod path')
  app.use('/', express.static(path.join(__dirname, '../dist')));

  app.get('/*', (req, res) => {
    console.log('catch all');
    return res.status(200).sendFile(path.join(__dirname, '../dist/index.html'));
  });
}



app.listen(3000, ()=> { console.log("Server started on port 3000")});