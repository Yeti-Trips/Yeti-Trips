const { Pool } = require("pg");
require("dotenv").config();
const connectionString = process.env.CONNECTION_STRING;
const pw = process.env.CONNECTION_PW;

const pool = new Pool({
  password: pw,
  connectionString: connectionString,
});

// // pool.connection();
// module.exports = {
//   query: (text, params, callback) => {
//     console.log("executed query", text);
//     return pool.query(text, params, callback);
//   },
// };

module.exports = pool;