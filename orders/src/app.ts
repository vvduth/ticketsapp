import express from "express";
import bodyParser from "body-parser";

import cookieSession from "cookie-session";

import { errorHandler, NotFoundError, currentUser } from "@tikket4real/common";
import "express-async-errors";

import { deleteOrdersRouter } from "./routes/delete";
import { indexOrdersRouter } from "./routes/index";
import {newOrdersRouter} from "./routes/new";
import {showOrdersRouter} from "./routes/show";

const app = express();
app.set("trust proxy", true);


// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(cookieSession({ signed: false, secure: process.env.NODE_ENV !== "test" }));
app.use(currentUser);

// Basic route
app.use(deleteOrdersRouter);
app.use(indexOrdersRouter);
app.use(newOrdersRouter);
app.use(showOrdersRouter);

app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler as express.ErrorRequestHandler);

export {app}