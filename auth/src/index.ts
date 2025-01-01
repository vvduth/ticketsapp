import { app } from "./app";
import mongoose from "mongoose";

const port = 3000;

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  try {
    mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }

  // Start the server
  app.listen(port, () => {
    console.log(`Server is running  on http://localhost:${port}`);
  });
};

start();
