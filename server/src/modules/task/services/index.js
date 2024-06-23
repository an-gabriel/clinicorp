const TaskCommands = require("../commands/index");

const taskCommands = new TaskCommands();

class TaskService {
  async getAllTasks(projectId) {
    try {
      const tasks = await taskCommands.getAll(projectId);
      return tasks;
    } catch (error) {
      throw new Error("Erro ao buscar tarefas");
    }
  }

  async createTask(projectId, title, description, status) {
    try {
      const newTask = await taskCommands.create(
        projectId,
        title,
        description,
        status
      );
      return newTask;
    } catch (error) {
      throw new Error("Erro ao criar tarefa");
    }
  }

  async updateTask(id, title, description, status, completedBy, completedAt) {
    try {
      const updatedTask = await taskCommands.update(
        id,
        title,
        description,
        status,
        completedBy,
        completedAt
      );
      return updatedTask;
    } catch (error) {
      throw new Error("Erro ao atualizar tarefa");
    }
  }

  async deleteTask(id) {
    try {
      await taskCommands.delete(id);
    } catch (error) {
      throw new Error("Erro ao excluir tarefa");
    }
  }
}

module.exports = TaskService;
