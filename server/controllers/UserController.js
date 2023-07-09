const db = require("../db");

const UserController = {
  async getUsers(req, res, next) {
    const queryText = "SELECT * FROM users;";
    const allUsers = await db.query(queryText);
    res.locals.allUsers = allUsers.rows;
    return next();
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
    const queryText = "WHERE EXISTS (SELECT * FROM users WHERE id = $1);";
    const user = await db.query(queryText, [userId]);
    res.locals.userInfo = user.rows;
    return next();
  },
  async createUser(req, res, next) {
    const { user_email, user_password, first_name, last_name } = req.body;
    const queryText =
      "INSERT INTO users (id, user_email, user_password, first_name, last_name) VALUES(DEFAULT, $1, $2,$3, $4)";
    const user = await db.query(queryText, [
      user_email,
      user_password,
      first_name,
      last_name,
    ]);
    res.locals.newUser = user.rows;
    return next();
  },
  async updateUser(req, res, next) {
    const id = parseInt(req.params.id);
    const { user_email, user_password } = req.body;
    const queryText =
      "UPDATE users SET user_email = $1, user_password = $2 WHERE id = $3";
    const updatedUser = await db.query(queryText, [
      user_email,
      user_password,
      id,
    ]);

    return next();
  },
  async deleteUser(req, res, next) {
    const id = parseInt(req.params.id);
    const queryText = "DELETE FROM users WHERE id = $1";
    const updatedUser = await db.query(queryText, [id]);

    return next();
  },
};

module.exports = UserController;
