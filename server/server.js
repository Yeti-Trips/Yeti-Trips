const express = require('express');
// const cookieSession = require('cookie-session'); //see below
const session = require('express-session');
const app = express();
const path = require('path');
const cors = require('cors');
const passport = require("passport");
const passportSetup = require('./passport.js');
const oauthRoute = require('./routes/oauth.js');
const logger = require('morgan');
const PgSession = require('connect-pg-simple')(session);

app.use(
  session({
    secret: 'yeti',
    resave: false,
    saveUninitialized: false,
    store: new PgSession({
      pool: pgPool,
      tableName: 'sessions',
     })
  })
)
//error due to cookie-session version. x.5 version works, x.6 does not?
// app.use(
//   cookieSession({
//     name: 'session',
//     keys: ["yeti"],
//     maxAge: 24 * 60 * 60 * 1000 // 24 hours
//   })
// )
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

//configure sesion middleware with PostgreSQL store
app.use(
  session({
    store: new PgSession({
      pool: pgPool,
      tableName: 'sessions',
    }),
    secret: 'yeti',
    resave: false,
    saveUninitialized: true,
  })
);
// app.use('/api', apiRouter);

app.use('/server/oauth', oauthRoute);
//Login POST
app.post('/server/login', (req, res, next) => {
  console.log(req.body);
  return next();
})

//Signup POST
app.post('/server/signup', (req, res, next) => {
  console.log(req.body);
  return next();
})

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