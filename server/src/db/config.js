const mongoose = require("mongoose");
const config = require("../config/index");

class MongoDBConnector {
  constructor() {
    this.MONGODB_URI = config.dbUri;
  }

  async connect() {
    try {
      await mongoose.connect(this.MONGODB_URI);
      console.log("Conexão bem-sucedida com o servidor MongoDB");
    } catch (error) {
      console.error("Erro ao conectar ao MongoDB:", error);
      process.exit(1);
    }
  }

  addEventListeners() {
    mongoose.connection.on("error", (err) => {
      console.error("Erro na conexão com o MongoDB:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("Desconectado do MongoDB");
    });

    mongoose.connection.on("reconnected", () => {
      console.log("Reconectado ao MongoDB");
    });

    mongoose.connection.on("close", () => {
      console.log("Conexão com o MongoDB fechada");
    });
  }
}

const dbConnector = new MongoDBConnector();
dbConnector.addEventListeners();

module.exports = dbConnector;
