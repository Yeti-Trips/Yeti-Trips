require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const userRoutes = require("./routes/user");

//connect to local database
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (process.env.NODE_ENV === "development") {
  console.log(process.env.NODE_ENV);
  // statically serve everything in the build folder on the route '/dist'
  app.use("/dist", express.static(path.join(__dirname, "../dist")));
  // serve index.html on the route '/'
  app.get("/*", (req, res) => {
    console.log("dev request");
    return res.status(200).sendFile(path.join(__dirname, "../src/index.html"));
  });
  // } else {
  //   console.log("entered prod path");
  //   app.use("/", express.static(path.join(__dirname, "../dist")));

  //   app.get("/*", (req, res) => {
  //     console.log("catch all");
  //     return res.status(200).sendFile(path.join(__dirname, "../dist/index.html"));
  //   });
}

app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});
