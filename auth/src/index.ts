import { app } from "./app";
import mongoose from "mongoose";

const port = 3000;

const start = async () => {
  console.log("Starting up...");
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }
  try {
    mongoose.connect(process.env.MONGO_URI, {});
    console.log("Connected to auth MongoDB");
  } catch (error) {
    console.error(error);
  }

  // Start the server
  app.listen(port, () => {
    console.log(`Server is running  on http://localhost:${port}`);
  });
};

start();
