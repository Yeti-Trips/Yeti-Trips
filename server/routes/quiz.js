const express = require("express");
const router = express.Router();
const quizController = require("../controllers/QuizController");

//Get ALL quizzes
router.get("/", quizController.getQuizzes, (req, res) => {
  res.status(200).json([...res.locals.allQuizzes]);
});

//Get quiz by id
router.get("/:id", quizController.getQuizById, (req, res) => {
  res.status(200).json(res.locals.quizInfo);
});

//PATCH or update a  quiz
//not sure if this should be done here if if we need to go through trip. Grab the quiz id from the trip...?
// router.patch("/:id", quizController.updateQuiz, (req, res) => {
//   res.status(200).json({ msg: "Updated quiz" });
// });

//DELETE a quiz
router.delete("/:id", quizController.deleteQuiz, (req, res) => {
  res.sendStatus(204);
});

module.exports = router;
