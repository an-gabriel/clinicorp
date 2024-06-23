const prisma = require("../../../config/prisma");

class ProjetoService {
  async getAll() {
    return await prisma.project.findMany();
  }

  async getById(projetoId, userId) {
    return await prisma.projeto.findUnique({
      where: {
        id: projetoId,
        userId: userId,
      },
    });
  }

  async create(userId, name, description) {
    return await prisma.projeto.create({
      data: {
        userId: userId,
        name: name,
        description: description,
        createdAt: new Date(),
      },
    });
  }

  async update(projetoId, userId, name, description) {
    return await prisma.projeto.update({
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
    return await prisma.projeto.delete({
      where: {
        id: projetoId,
        userId: userId,
      },
    });
  }
}

module.exports = ProjetoService;
