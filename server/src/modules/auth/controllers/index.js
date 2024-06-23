const authService = require("../services/index");

class AuthController {
  /**
   * @swagger
   * tags:
   *   name: Auth
   *   description: Operações de registro e autenticação de usuários
   */

  /**
   * @swagger
   * /auth/register:
   *   post:
   *     summary: Registrar um novo usuário
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       200:
   *         description: Usuário registrado com sucesso
   *       400:
   *         description: Erro ao registrar usuário
   */
  async register(req, res) {
    try {
      const { name, email, password } = req.body;
      const user = await authService.register(name, email, password);
      res.json(user);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  /**
   * @swagger
   * /auth/login:
   *   post:
   *     summary: Autenticar um usuário existente
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       200:
   *         description: Login bem-sucedido, retorna token JWT e informações do usuário
   *       400:
   *         description: Credenciais inválidas
   */
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const { token, user } = await authService.login(email, password);
      res.json({ token, user });
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
}

module.exports = new AuthController();
