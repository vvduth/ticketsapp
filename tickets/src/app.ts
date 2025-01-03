import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";

import cookieSession from "cookie-session";

import { errorHandler, NotFoundError } from "@tikket4real/common";
import "express-async-errors";

const app = express();
app.set("trust proxy", true);


// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(cookieSession({ signed: false, secure: process.env.NODE_ENV !== "test" }));

// Basic route


app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler as express.ErrorRequestHandler);

export {app}