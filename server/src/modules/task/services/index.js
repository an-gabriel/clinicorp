const prisma = require("../../../config/prisma");

class TaskService {
  async getAll(projectId) {
    return await prisma.task.findMany({
      where: { projectId },
    });
  }

  async create(projectId, title, description, status, userId) {
    const task = await prisma.task.create({
      data: {
        projectId,
        completedBy: userId,
        description,
        status: status,
        createdAt: new Date(),
        title,
      },
    });
    console.log(task);
    return task;
  }

  async update(taskId, title, description, status, completedBy, completedAt) {
    return await prisma.task.update({
      where: { id : taskId },
      data: {
        title,
        description,
        status,
        completedBy,
        completedAt,
      },
    });
  }

  async delete(id) {
    return await prisma.task.delete({
      where: { id },
    });
  }
}

module.exports = TaskService;
