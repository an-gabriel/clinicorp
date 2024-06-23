const { db } = require("../db");

db.on("err", console.log.bind("Error connecting to database"));
db.once("open", () => console.log("database connection successfully made"));
