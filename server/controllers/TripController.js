// Queries the trips table
const db = require("../db");

const TripController = {
  async getTrips(req, res, next) {
    const queryText = "SELECT * FROM trips ORDER BY tripId ASC;";
    try {
      const allTrips = await db.query(queryText);
      res.locals.allTrips = allTrips.rows;
      return next();
    } catch (err) {
      return next({
        log: "Express error handler caught middleware error when getting ALL trips",
        message: { err: err },
      });
    }
  },

  async getTripById(req, res, next) {
    const tripId = parseInt(req.params.id, 10);
    const queryText = " SELECT * FROM trips WHERE tripId = $1;";
    try {
      const trip = await db.query(queryText, [tripId]);
      res.locals.tripInfo = trip.rows;
      return next();
    } catch (err) {
      return next({
        log: "Express error handler caught middleware error when getting trip by id",
        message: { err: err },
      });
    }
  },
  async createTrip(req, res, next) {
    let { tripName, startDate, endDate } = req.body;
    startDate = new Date(startDate);
    endDate = new Date(endDate);

    const queryText1 =
      "INSERT INTO trips (tripId, tripName, startDate, endDate) VALUES (DEFAULT, $1, $2, $3)";
    const tripIdQuery = "SELECT MAX(tripId) FROM trips;";

    try {
      const trip = await db.query(queryText1, [tripName, startDate, endDate]);
      const tripId = await db.query(tripIdQuery);
      res.locals.newTrip = tripId.rows[0].max;
      return next();
    } catch (err) {
      return next({
        log: "Express error handler caught middleware error when creating trip",
        message: { err: err },
      });
    }
  },
};

module.exports = TripController;
