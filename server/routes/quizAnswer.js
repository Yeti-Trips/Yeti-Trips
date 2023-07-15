const express = require("express");
const router = express.Router();
const quizAnswerController = require("../controllers/QuizAnswerController");

//Get ALL quiz questions which will be the answers to the questions asked in the front end
router.get("/", quizAnswerController.getQuizAnswers, (req, res) => {
  res.status(200).json([...res.locals.allQuizAnswers]);
});

//Get quiz by id
router.get("/:id", quizAnswerController.getQuizAnswersById, (req, res) => {
  res.status(200).json(res.locals.quizAnswerInfo);
});

module.exports = router;
