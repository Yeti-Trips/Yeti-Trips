const db = require("../db");

const UserController = {
  async getUsers(req, res, next) {
    const queryText = "SELECT * FROM users ORDER BY userId ASC;";
    try {
      const allUsers = await db.query(queryText);
      res.locals.allUsers = allUsers.rows;
      return next();
    } catch (err) {
      return next({
        log: "Express error handler caught middleware error when getting ALL users",
        message: { err: err },
      });
    }
  },
  // async getUser(req, res, next) {
  //   const userEmail = req.params.email;
  //   const queryText = "SELECT * FROM users WHERE user_email = $1;";
  //   const user = await db.query(queryText, [userEmail]);
  //   res.locals.user = user.rows;
  //   return next();
  // },
  async getUserById(req, res, next) {
    const userId = parseInt(req.params.id);
    const queryText = " SELECT * FROM users WHERE userId = $1;";
    try {
      const user = await db.query(queryText, [userId]);
      res.locals.userInfo = user.rows;
      return next();
    } catch (err) {
      return next({
        log: "Express error handler caught middleware error when getting user by id",
        message: { err: err },
      });
    }
  },
  async createUser(req, res, next) {
    const { email, userPassword, firstName, lastName } = req.body;
    const queryText =
      "INSERT INTO users (userId, email, userPassword, firstName, lastName) VALUES(DEFAULT, $1, $2,$3, $4)";
    // const avatarStr = path.join(__dirname, "../Assets/yeti-avatar.png");
    try {
      const user = await db.query(queryText, [
        email,
        userPassword,
        firstName,
        lastName,
      ]);
      // res.locals.newUser = user.rows;
      return next();
    } catch (err) {
      return next({
        log: "Express error handler caught middleware error when creating user",
        message: { err: err },
      });
    }
  },
  async updateUser(req, res, next) {
    const userId = parseInt(req.params.id);
    //user can change their avatar, password, and email
    if (req.body.hasOwnProperty("avatarImage")) {
      const { avatarImage } = req.body;
      const queryText = "UPDATE users SET avatarImage = $1 WHERE userId = $2";
      try {
        const updatedUser = await db.query(queryText, [avatarImage, userId]);
        return next();
      } catch (err) {
        return next({
          log: "Express error handler caught middleware error when updating user avatar",
          message: { err: err },
        });
      }
    } else if (req.body.hasOwnProperty("userPassword")) {
      const { userPassword } = req.body;
      const queryText = "UPDATE users SET userPassword = $1 WHERE userId = $2";
      try {
        const updatedUser = await db.query(queryText, [userPassword, userId]);
        return next();
      } catch (err) {
        return next({
          log: "Express error handler caught middleware error when updating user password",
          message: { err: err },
        });
      }
    } else if (req.body.hasOwnProperty("email")) {
      const { email } = req.body;
      const queryText = "UPDATE users SET email = $1 WHERE userId = $2";
      try {
        const updatedUser = await db.query(queryText, [email, userId]);
        return next();
      } catch (err) {
        return next({
          log: "Express error handler caught middleware error when updating user email",
          message: { err: err },
        });
      }
    }
  },
  async deleteUser(req, res, next) {
    const id = parseInt(req.params.id);
    const queryText = "DELETE FROM users WHERE userId = $1";
    try {
      const updatedUser = await db.query(queryText, [id]);
      return next();
    } catch (err) {
      return next({
        log: "Express error handler caught middleware error when updating user",
        message: { err: err },
      });
    }
  },
};

module.exports = UserController;
