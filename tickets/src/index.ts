import { app } from "./app";
import mongoose from "mongoose";
import { natsWrapper } from "./nats-wrapper";

const port = 3000;

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }
  try {
    await natsWrapper.connect("ticketing", "asdsad", "http://nats-srv:4222");
    await mongoose.connect(process.env.MONGO_URI,{});
    console.log("Connected to tickets MongoDB");
  } catch (error) {
    console.error(error);
  }

  // Start the server
  app.listen(port, () => {
    console.log(`Server is running  on http://localhost:${port}`);
  });
};

start();
