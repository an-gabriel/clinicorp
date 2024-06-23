const TaskService = require("../services/index");

const taskService = new TaskService();

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID da tarefa.
 *         projectId:
 *           type: string
 *           description: ID do projeto ao qual a tarefa está associada.
 *         title:
 *           type: string
 *           description: Título da tarefa.
 *         description:
 *           type: string
 *           description: Descrição da tarefa.
 *         status:
 *           type: string
 *           enum: [PENDING, COMPLETED]
 *           description: Status da tarefa (pendente ou concluída).
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Data de criação da tarefa.
 *         completedBy:
 *           type: string
 *           description: ID do usuário que completou a tarefa.
 *         completedAt:
 *           type: string
 *           format: date-time
 *           description: Data de conclusão da tarefa.
 */

class TaskController {
  /**
   * @swagger
   * /api/projects/{projectId}/tasks:
   *   get:
   *     summary: Retorna todas as tarefas de um projeto.
   *     tags:
   *       - Tarefas
   *     parameters:
   *       - in: path
   *         name: projectId
   *         required: true
   *         schema:
   *           type: string
   *         description: ID do projeto
   *     responses:
   *       200:
   *         description: Lista de tarefas recuperada com sucesso.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Task'
   *       500:
   *         description: Erro ao buscar tarefas.
   */
  async getAll(req, res) {
    try {
      const projectId = req.params.projectId;
      const tasks = await taskService.getAllTasks(projectId);
      res.json(tasks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao buscar tarefas" });
    }
  }

  /**
   * @swagger
   * /api/projects/{projectId}/tasks:
   *   post:
   *     summary: Criar uma nova tarefa em um projeto.
   *     tags:
   *       - Tarefas
   *     parameters:
   *       - in: path
   *         name: projectId
   *         required: true
   *         schema:
   *           type: string
   *         description: ID do projeto
   *       - in: body
   *         name: body
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             title:
   *               type: string
   *               description: Título da tarefa
   *             description:
   *               type: string
   *               description: Descrição da tarefa (opcional)
   *             status:
   *               type: string
   *               enum: [PENDING, COMPLETED]
   *               description: Status da tarefa (pendente ou concluída)
   *     responses:
   *       201:
   *         description: Tarefa criada com sucesso.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Task'
   *       500:
   *         description: Erro ao criar tarefa.
   */
  async create(req, res) {
    try {
      const projectId = req.params.projectId;
      const { title, description, status } = req.body;
      const newTask = await taskService.createTask(
        projectId,
        title,
        description,
        status
      );
      res.status(201).json(newTask);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao criar tarefa" });
    }
  }

  /**
   * @swagger
   * /tasks/{id}:
   *   put:
   *     summary: Atualizar uma tarefa existente.
   *     tags:
   *       - Tarefas
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID da tarefa
   *       - in: body
   *         name: body
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             title:
   *               type: string
   *               description: Novo título da tarefa
   *             description:
   *               type: string
   *               description: Nova descrição da tarefa (opcional)
   *             status:
   *               type: string
   *               enum: [PENDING, COMPLETED]
   *               description: Novo status da tarefa (pendente ou concluída)
   *             completedBy:
   *               type: string
   *               description: ID do usuário que completou a tarefa (opcional)
   *             completedAt:
   *               type: string
   *               format: date-time
   *               description: Data de conclusão da tarefa (opcional)
   *     responses:
   *       200:
   *         description: Tarefa atualizada com sucesso.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Task'
   *       500:
   *         description: Erro ao atualizar tarefa.
   */
  async update(req, res) {
    try {
      const taskId = req.params.id;
      const { title, description, status, completedBy, completedAt } = req.body;
      const updatedTask = await taskService.updateTask(
        taskId,
        title,
        description,
        status,
        completedBy,
        completedAt
      );
      res.json(updatedTask);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao atualizar tarefa" });
    }
  }

  /**
   * @swagger
   * /tasks/{id}:
   *   delete:
   *     summary: Excluir uma tarefa.
   *     tags:
   *       - Tarefas
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID da tarefa
   *     responses:
   *       200:
   *         description: Tarefa excluída com sucesso.
   *       500:
   *         description: Erro ao excluir tarefa.
   */
  async delete(req, res) {
    try {
      const taskId = req.params.id;
      await taskService.deleteTask(taskId);
      res.json({ message: "Tarefa excluída com sucesso" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao excluir tarefa" });
    }
  }
}

module.exports = TaskController;
