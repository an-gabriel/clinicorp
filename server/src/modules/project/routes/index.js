// src/routes/projeto.routes.js

const express = require("express");
const router = express.Router();
const ProjetoController = require("../controllers/index");
const jwtMiddleware = require("../../../middleware/authMiddleware");

const projetoController = new ProjetoController();

// Middleware para autenticar usando Bearer Token JWT
router.use(jwtMiddleware.verifyToken);

// Definição das rotas
router.get("/", projetoController.getAll.bind(projetoController));
router.get("/:id", projetoController.getById.bind(projetoController));
router.post("/", projetoController.create.bind(projetoController));
router.put("/:id", projetoController.update.bind(projetoController));
router.delete("/:id", projetoController.delete.bind(projetoController));

module.exports = router;
