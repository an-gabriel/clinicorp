const express = require("express");
const router = express.Router();
const TaskController = require("../controllers/index");
const jwtMiddleware = require("../../../middleware/authMiddleware");

const taskController = new TaskController();

router.use(jwtMiddleware.verifyToken);

router.get(
  "/projects/:projectId/tasks",
  taskController.getAll.bind(taskController)
);

router.post(
  "/projects/:projectId/tasks",
  taskController.create.bind(taskController)
);

router.put("/tasks/:id", taskController.update.bind(taskController));

router.delete("/tasks/:id", taskController.delete.bind(taskController));

module.exports = router;
