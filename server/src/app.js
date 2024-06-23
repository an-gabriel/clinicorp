const express = require("express");
const cors = require("cors");

const { router } = require("./routes");
const configureSwagger = require("./config/swagger");

const app = express();

configureSwagger(app);

app.use(express.json());
app.use(cors());

app.use("/api", router);

module.exports = app;
