import express from "express";
import bodyParser from "body-parser";

import cookieSession from "cookie-session";
import { createChargeRouter } from "./routes/new";
import { errorHandler, NotFoundError, currentUser } from "@tikket4real/common";
import "express-async-errors";


const app = express();
app.set("trust proxy", true);


// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(cookieSession({ signed: false, secure: process.env.NODE_ENV !== "test" }));
app.use(currentUser);

// Routes
app.use(createChargeRouter);



app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler as express.ErrorRequestHandler);

export {app}