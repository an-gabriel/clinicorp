const { MongoClient } = require("mongodb");
const config = require("../config/index");

const uri = config.dbUri;
const client = new MongoClient(uri);

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB server");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit process with failure
  }
}

// Event listeners for MongoDB client
client.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

client.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

client.on("reconnected", () => {
  console.log("MongoDB reconnected");
});

client.on("close", () => {
  console.log("MongoDB connection closed");
});

module.exports = {
  connectToMongoDB,
  client,
};
