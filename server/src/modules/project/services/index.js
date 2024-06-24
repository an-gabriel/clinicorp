const prisma = require("../../../config/prisma");

class ProjetoService {
  async getAll() {
    return await prisma.project.findMany();
  }

  async getById(projetoId, userId) {
    return await prisma.project.findUnique({
      where: {
        id: projetoId,
        userId: userId,
      },
    });
  }

  async create(userId, name, description) {
    return await prisma.project.create({
      data: {
        userId: userId,
        name: name,
        description: description,
        createdAt: new Date(),
      },
    });
  }

  async update(projetoId, userId, name, description) {
    return await prisma.project.update({
      where: {
        id: projetoId,
        userId: userId,
      },
      data: {
        name: name,
        description: description,
      },
    });
  }

  async delete(projetoId, userId) {
    return await prisma.project.delete({
      where: {
        id: projetoId,
        userId: userId,
      },
    });
  }
}

module.exports = ProjetoService;
