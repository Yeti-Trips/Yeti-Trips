const express = require("express");
const router = express.Router();
const tripController = require("../controllers/TripController");
const quizController = require("../controllers/QuizController");
const quizAnswerController = require("../controllers/QuizAnswerController");

// Trip Routing

//Get ALL trips
router.get("/", tripController.getTrips, (req, res) => {
  res.status(200).json([...res.locals.allTrips]);
});
//Get trips by id
router.get("/:id", tripController.getTripById, (req, res) => {
  res.status(200).json(res.locals.tripInfo);
});

//Create a new trip, quiz, 3 quiz Answers
router.post(
  "/",
  tripController.createTrip,
  quizController.createQuiz,
  quizAnswerController.createQuizAnswers,
  (req, res) => {
    res.status(200).json({
      msg: `Trip Created! TripId: ${res.locals.newTrip} QuizId: ${res.locals.newQuiz}`,
    });
  }
);

module.exports = router;
