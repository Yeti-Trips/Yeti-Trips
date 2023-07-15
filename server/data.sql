

CREATE TABLE users (
    userId SERIAL PRIMARY KEY NOT NULL ,
    email VARCHAR(255) NOT NULL,
    userPassword VARCHAR(255) NOT NULL,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    avatarImage VARCHAR(255),
    UNIQUE(email)
);

CREATE TABLE trips(
    tripId SERIAL PRIMARY KEY NOT NULL ,
    tripName VARCHAR(255) NOT NULL,
    startDate DATE NOT NULL, 
    endDate DATE NOT NULL
);

-- created but not used
CREATE TABLE tripGuests (
    tripGuestId SERIAL PRIMARY KEY NOT NULL ,
    userId INT NOT NULL,
    tripId INT NOT NULL,
    isOwner BIT,
    FOREIGN KEY(userId) REFERENCES users(userId),
    FOREIGN KEY(tripId) REFERENCES trips(tripId)
);

CREATE TABLE quizzes(
    quizId SERIAL PRIMARY KEY NOT NULL ,
    tripId INT NOT NULL,
    quizDeadline DATE NOT NULL,
    FOREIGN KEY(tripId) REFERENCES trips(tripId)
);



CREATE TABLE quizAnswers(
    quizAnswerId SERIAL PRIMARY KEY NOT NULL ,
    quizId INT NOT NULL,
    answerDescription VARCHAR(255) NOT NULL,
    FOREIGN KEY(quizId) REFERENCES quizzes(quizId)
);



CREATE TABLE userQuizzes(
    userQuizId SERIAL PRIMARY KEY NOT NULL ,
    userId INT NOT NULL,
    quizId INT NOT NULL,
    quizDate DATE NOT NULL,
    FOREIGN KEY(userId) REFERENCES users(userId),
    FOREIGN KEY(quizId) REFERENCES quizzes(quizId)
);

CREATE TABLE quizResults(
    quizResultId SERIAL PRIMARY KEY NOT NULL ,
    userQuizId INT NOT NULL,
    quizAnswerId INT NOT NULL,
    FOREIGN KEY(userQuizId) REFERENCES usersQuizzes(userQuizId),
    FOREIGN KEY(quizAnswerId) REFERENCES quizAnswers(quizAnswerID)
);
-- Query below:
BEGIN
    INSERT INTO trips (tripName, startDate, endDate) 
    OUTPUT inserted.tripId INTO @tripOutput
    VALUES 'trip name', '1/1/99', '1/7/99'

    INSERT INTO quizzes (tripId, quizDeadline)
    OUTPUT inserted.quizId INTO @quizOutput
    VALUES @tripOutput.tripId, '1/5/99'

-- rethink this bc it has quizQuestionId
    INSERT INTO quizAnswers (quizQuestionID, quizId, answerDescription) 
    VALUES 1, quizOutput.quizId, 'answer'

    INSERT INTO tripGuests (userId, tripId, isOwner)
    VALUES 123, 
END

what time of year would you like to go? pk1 blalk, adlajkaka, alkdk

-- questionOneArray: {
--     quizQuestionId: 1
--     answers: []
-- }

CREATE TABLE sessions (
  sid VARCHAR PRIMARY KEY NOT NULL,
  sess JSON NOT NULL,
  expire TIMESTAMP(6) NOT NULL
);