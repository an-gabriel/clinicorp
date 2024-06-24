const ProjetoService = require("../services/index");

const projetoService = new ProjetoService();

class ProjetoCommands {
  async getAll() {
    return await projetoService.getAll();
  }

  async getById(projetoId, userId) {
    return await projetoService.getById(projetoId, userId);
  }

  async create(userId, name, description) {
    return await projetoService.create(userId, name, description);
  }

  async update(projetoId, userId, name, description) {
    return await projetoService.update(projetoId, userId, name, description);
  }

  async delete(projetoId, userId) {
    return await projetoService.delete(projetoId, userId);
  }
}

module.exports = ProjetoCommands;
