// Queries the quizzes table
const db = require("../db");

const QuizAnswerController = {
  async getQuizAnswers(req, res, next) {
    const queryText = "SELECT * FROM quizAnswers ORDER BY quizAnswerId ASC;";
    try {
      const allQuizAnswers = await db.query(queryText);
      res.locals.allQuizAnswers = allQuizAnswers.rows;
      return next();
    } catch (err) {
      return next({
        log: "Express error handler caught middleware error when getting ALL quiz answers",
        message: { err: err },
      });
    }
  },
  async getQuizAnswersById(req, res, next) {
    const quizAnswerId = parseInt(req.params.id, 10);
    const queryText = " SELECT * FROM quizAnswers WHERE quizAnswerId = $1;";
    try {
      const quizAnswer = await db.query(queryText, [quizAnswerId]);
      res.locals.quizAnswerInfo = quizAnswer.rows;

      return next();
    } catch (err) {
      return next({
        log: "Express error handler caught middleware error when getting quiz by id",
        message: { err: err },
      });
    }
  },
  async createQuizAnswers(req, res, next) {
    //quiz is from the front end and contains the questions to ask the users
    const currentQuizId = res.locals.newQuiz;
    const { quiz } = req.body;
    let finalQuery = "";
    const queryText1 =
      "INSERT INTO quizAnswers (quizAnswerId, quizId, answerDescription) VALUES ( DEFAULT, $1, $2);";
    const quizIdQuery = "SELECT MAX(quizAnswerId) FROM quizAnswers;";

    // console.log(quiz);
    for (const questions in quiz) {
      for (const questionIdNum in quiz[questions]) {
        //questionId needs to be called when creating the record for this quiz question
        const questionId = parseInt(questionIdNum, 10);
        //loop through to create the question record
        const questionAnswersArray = quiz[questions][questionIdNum];
        for (let i = 0; i < questionAnswersArray.length; i++) {
          console.log(questionId + " " + questionAnswersArray[i]);
          const addedQuery = `INSERT INTO quizAnswers (quizAnswerId, quizId, answerDescription) VALUES ( DEFAULT, ${currentQuizId}, "${questionAnswersArray[i]}");`;

          finalQuery = finalQuery + addedQuery;
        }
      }
    }
    //the query is created
    console.log(finalQuery);
    //the large query is not executed on the db. Error's out.
    try {
      const quizAnswer = await db.query(finalQuery);
      // const createdQuestionId = await db.query(quizIdQuery);
      // res.locals.newQuestion = createdQuestionId.rows[0].max;
      return next();
    } catch (err) {
      return next({
        log: "Express error handler caught middleware error when creating quiz question from answer",
        message: { err: err },
      });
    }
    console.log(finalQuery);
  },
};

module.exports = QuizAnswerController;
