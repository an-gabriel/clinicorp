const app = require("./src/app");
const config = require("./src/config/index");
const { connectToMongoDB } = require("./src/db/config");

const startServer = async () => {
  try {
    await connectToMongoDB();
    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

startServer();
