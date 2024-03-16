const { JsonDatabase } = require("wio.db");
const db = new JsonDatabase({
  databasePath: "./db/data.json",
});
module.exports = db;

