// src/controllers/projeto.controller.js

const ProjetoCommands = require("../commands/index");
const projetoCommands = new ProjetoCommands();

/**
 * @swagger
 * tags:
 *   name: Projetos
 *   description: Endpoints para operações relacionadas a projetos.
 */

class ProjetoController {
  /**
   * @swagger
   * /api/project:
   *   get:
   *     summary: Retorna todos os projetos do usuário autenticado.
   *     tags: [Projetos]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Projetos retornados com sucesso.
   *       500:
   *         description: Erro ao buscar projetos.
   */
  async getAll(req, res) {
    try {
      const projetos = await projetoCommands.getAll();
      res.json(projetos);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao buscar projetos" });
    }
  }

  /**
   * @swagger
   * /api/project/{id}:
   *   get:
   *     summary: Retorna um projeto específico pelo ID.
   *     tags: [Projetos]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID do projeto a ser retornado.
   *     responses:
   *       200:
   *         description: Projeto retornado com sucesso.
   *       404:
   *         description: Projeto não encontrado.
   *       500:
   *         description: Erro ao buscar projeto.
   */
  async getById(req, res) {
    try {
      const userId = req.user.userId;
      const projetoId = parseInt(req.params.id);
      const projeto = await projetoCommands.getById(projetoId, userId);
      if (!projeto) {
        return res.status(404).json({ error: "Projeto não encontrado" });
      }
      res.json(projeto);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao buscar projeto" });
    }
  }

  /**
   * @swagger
   * /api/project:
   *   post:
   *     summary: Cria um novo projeto.
   *     tags: [Projetos]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *               description:
   *                 type: string
   *             required:
   *               - name
   *     responses:
   *       201:
   *         description: Projeto criado com sucesso.
   *       500:
   *         description: Erro ao criar projeto.
   */
  async create(req, res) {
    try {
      const userId = req.user.userId;
      const { name, description } = req.body;
      const novoProjeto = await projetoCommands.create(
        userId,
        name,
        description
      );
      res.status(201).json(novoProjeto);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao criar projeto" });
    }
  }

  /**
   * @swagger
   * /api/project/{id}:
   *   put:
   *     summary: Atualiza um projeto existente pelo ID.
   *     tags: [Projetos]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID do projeto a ser atualizado.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *               description:
   *                 type: string
   *             required:
   *               - name
   *     responses:
   *       200:
   *         description: Projeto atualizado com sucesso.
   *       500:
   *         description: Erro ao atualizar projeto.
   */
  async update(req, res) {
    try {
      const userId = req.user.userId;
      const projetoId = parseInt(req.params.id);
      const { name, description } = req.body;
      const projetoAtualizado = await projetoCommands.update(
        projetoId,
        userId,
        name,
        description
      );
      res.json(projetoAtualizado);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao atualizar projeto" });
    }
  }

  /**
   * @swagger
   * /api/project/{id}:
   *   delete:
   *     summary: Exclui um projeto pelo ID.
   *     tags: [Projetos]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID do projeto a ser excluído.
   *     responses:
   *       200:
   *         description: Projeto excluído com sucesso.
   *       500:
   *         description: Erro ao excluir projeto.
   */
  async delete(req, res) {
    try {
      const userId = req.user.userId;
      const projetoId = parseInt(req.params.id);
      await projetoCommands.delete(projetoId, userId);
      res.json({ message: "Projeto excluído com sucesso" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao excluir projeto" });
    }
  }
}

module.exports = ProjetoController;
