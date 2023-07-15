// Queries the quizzes table
const db = require("../db");

const QuizController = {
  async getQuizzes(req, res, next) {
    const queryText = "SELECT * FROM quizzes ORDER BY quizId ASC;";
    try {
      const allQuizzes = await db.query(queryText);
      res.locals.allQuizzes = allQuizzes.rows;
      return next();
    } catch (err) {
      return next({
        log: "Express error handler caught middleware error when getting ALL quizzes",
        message: { err: err },
      });
    }
  },
  async getQuizById(req, res, next) {
    const quizId = parseInt(req.params.id, 10);
    const queryText = " SELECT * FROM quizzes WHERE quizId = $1;";
    try {
      const quiz = await db.query(queryText, [quizId]);
      res.locals.quizInfo = quiz.rows;

      return next();
    } catch (err) {
      return next({
        log: "Express error handler caught middleware error when getting quiz by id",
        message: { err: err },
      });
    }
  },
  async createQuiz(req, res, next) {
    const tripId = res.locals.newTrip;
    const { quizDeadline } = req.body;

    const queryText1 =
      "INSERT INTO quizzes (quizId, tripId, quizDeadline) VALUES (DEFAULT, $1, $2)";
    const quizIdQuery = "SELECT MAX(quizId) FROM quizzes;";

    try {
      const quiz = await db.query(queryText1, [tripId, quizDeadline]);
      const createdQuizId = await db.query(quizIdQuery);
      res.locals.newQuiz = createdQuizId.rows[0].max;
      return next();
    } catch (err) {
      return next({
        log: "Express error handler caught middleware error when creating quiz",
        message: { err: err },
      });
    }
  },
  // //add a way to update quiz... what should this look like?
  // async updateQuiz(req, res, next) {
  //   const quizId = parseInt(req.params.id);


  // },
  //delete quiz
  async deleteQuiz(req, res, next) {
    const id = parseInt(req.params.id);
    const queryText = "DELETE FROM quizzes WHERE quizId = $1";
    try {
      const deleteQuiz = await db.query(queryText, [id]);
      return next();
    } catch (err) {
      return next({
        log: "Express error handler caught middleware error when deleting quiz",
        message: { err: err },
      });
    }
  },
};

module.exports = QuizController;
