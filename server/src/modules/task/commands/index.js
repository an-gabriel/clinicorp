const { PrismaClient, TaskStatus } = require('@prisma/client');
const prisma = new PrismaClient();

class TaskCommands {
  async getAll(projectId) {
    return await prisma.task.findMany({
      where: { projectId },
    });
  }

  async create(projectId, title, description, status) {
    return await prisma.task.create({
      data: {
        projectId,
        title,
        description,
        status,
      },
    });
  }

  async update(id, title, description, status, completedBy, completedAt) {
    return await prisma.task.update({
      where: { id },
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

module.exports = TaskCommands;
