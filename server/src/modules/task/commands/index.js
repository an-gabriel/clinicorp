const { PrismaClient, TaskStatus } = require("@prisma/client");

const TaskService = require("../services/index");
const taskService = new TaskService();

class TaskCommands {
  async getAllTasks(projectId) {
    try {
      const tasks = await taskService.getAll(projectId);
      return tasks;
    } catch (error) {
      throw new Error("Erro ao buscar tarefas");
    }
  }

  async createTask(projectId, title, description, status, userId) {
    try {
      const newTask = await taskService.create(
        projectId,
        title,
        description,
        status,
        userId
      );
      return newTask;
    } catch (error) {
      console.log(error);
      throw new Error("Erro ao criar tarefa");
    }
  }

  async updateTask(
    taskId,
    title,
    description,
    status,
    completedBy,
    completedAt
  ) {
    try {
      const updatedTask = await taskService.update(
        taskId,
        title,
        description,
        status,
        completedBy,
        completedAt
      );
      return updatedTask;
    } catch (error) {
      console.log(error);
      throw new Error("Erro ao atualizar tarefa");
    }
  }

  async deleteTask(id) {
    try {
      await taskService.delete(id);
    } catch (error) {
      throw new Error("Erro ao excluir tarefa");
    }
  }
}

module.exports = TaskCommands;
