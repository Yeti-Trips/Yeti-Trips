const express = require("express");
const session = require("express-session");
const app = express();
const path = require("path");
const cors = require("cors");
const passport = require("passport");
const passportSetup = require("./passport.js");
const oauthRoute = require("./routes/oauth.js");
const logger = require("morgan");
const PgSession = require("connect-pg-simple")(session);
require("dotenv").config();

const userRoutes = require("./routes/user");
const tripRoutes = require("./routes/trip");
const quizRoutes = require("./routes/quiz");
//quiz Answers are really the questions the owner generated
const quizAnswerRoutes = require("./routes/quizAnswer");
const pgPool = require("./db.js");

//connect to local database
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "yeti",
    resave: false,
    saveUninitialized: false,
    store: new PgSession({
      pool: pgPool,
      tableName: "sessions",
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
app.use("/avatar", express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//connect to local database

//configure sesion middleware with PostgreSQL store
// app.use('/api', apiRouter);

//login routes
app.use("/server/oauth", oauthRoute);

//Login POST
app.post("/server/login", (req, res, next) => {
  console.log(req.body);
  return next();
});

//Signup POST
app.post("/server/signup", (req, res, next) => {
  console.log(req.body);
  return next();
});

//User Route
app.use("/api/users", userRoutes);
//Trips Route
app.use("/api/trips", tripRoutes);
//Quizzes Route
app.use("/api/quiz", quizRoutes);
//Quiz Answer Route
app.use("/api/quizAnswer", quizAnswerRoutes);

if (process.env.NODE_ENV === "development") {
  console.log(process.env.NODE_ENV);
  // statically serve everything in the build folder on the route '/dist'
  app.use("/dist", express.static(path.join(__dirname, "../dist")));
  // serve index.html on the route '/'
  app.get("/*", (req, res) => {
    console.log("dev request");
    return res.status(200).sendFile(path.join(__dirname, "../src/index.html"));
  });
} else {
  console.log("entered prod path");
  app.use("/", express.static(path.join(__dirname, "../dist")));

  app.get("/*", (req, res) => {
    console.log("catch all");
    return res.status(200).sendFile(path.join(__dirname, "../dist/index.html"));
  });
}

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 400,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, async () => {
  try {
    await pgPool.query("SELECT NOW()"); // Query the database to check the connection
    console.log("Connected to the database");
    console.log("Server started on port " + PORT);
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
});
