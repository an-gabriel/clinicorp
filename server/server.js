const app = require("./src/app");
const config = require("./src/config/index");
const dbConnector = require("./src/db/config");

const startServer = async () => {
  try {
    await dbConnector.connect();
    app.listen(config.port, () => {
      console.log(`O servidor está rodando na porta ${config.port}`);
    });
  } catch (error) {
    console.error("Erro ao iniciar o servidor:", error);
    process.exit(1);
  }
};

startServer();
