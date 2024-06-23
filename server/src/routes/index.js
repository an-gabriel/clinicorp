const express = require("express");
const authRoutes = require("../modules/auth/routes/index.js");

const router = express.Router();

router.use("/auth", authRoutes);

module.exports = { router };
