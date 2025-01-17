const express = require("express");
const authRoutes = require("../modules/auth/routes/index.js");
const projectRoutes = require("../modules/project/routes/index.js");
const taskRoutes = require("../modules/task/routes/index.js");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/project", projectRoutes);
router.use("/", taskRoutes);

module.exports = { router };
