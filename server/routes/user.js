const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");

//GET all users
router.get("/", userController.getUsers, (req, res) => {
  res.status(200).json([...res.locals.allUsers]);
});

// //Get user by email
// router.get("/:email", userController.getUser, (req, res) => {
//   res.status(200).json(res.locals.user);
// });

//Get user by id
router.get("/:id", userController.getUserById, (req, res) => {
  res.status(200).json(res.locals.userInfo);
});

//POST a new user
router.post("/", userController.createUser, (req, res) => {
  res.status(200).json(res.locals.newUser);
});

//PATCH a  user
router.patch("/:id", userController.updateUser, (req, res) => {
  res.json({ msg: "Updated user" });
  res.sendStatus(200);
});

//DELETE a user
router.delete("/:id", userController.deleteUser, (req, res) => {
  res.sendStatus(204);
});

module.exports = router;
