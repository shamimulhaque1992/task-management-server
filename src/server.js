import mongoose from "mongoose";
// import { logger, errorLogger } from './shared/logger';
import { Server } from "http";
import config from "./config/index.js";
import app from "./app.js";

process.on("uncaughtException", (error) => {
  console.log(error);
  process.exit(1);
});
let server;
async function databaseConnection() {
  try {
    await mongoose.connect(config.database_url);
    server = app.listen(config.port, () => {
      console.log(`Application listening on port ${config.port}`);
    });
    console.log("🛢 Database Connected Successfully  ⚙");
  } catch (e) {
    console.log("Failed to connect database!💀", e);
  }

  process.on("unhandledRejection", (error) => {
    console.log(
      "Unhandled Rejection is detected, we are closing our server....."
    );
    if (server) {
      server.close(() => {
        console.log(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}
databaseConnection();

process.on("SIGTERM", () => {
  console.log("SIGTERM is received");
  if (server) {
    server.close();
  }
});
