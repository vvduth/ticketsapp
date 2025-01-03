import express from "express";
import bodyParser from "body-parser";

import cookieSession from "cookie-session";

import { errorHandler, NotFoundError, currentUser } from "@tikket4real/common";
import "express-async-errors";
import { createTicketRouter } from "./routes/new";
import { showTicketRouter } from "./routes/show";

const app = express();
app.set("trust proxy", true);


// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(cookieSession({ signed: false, secure: process.env.NODE_ENV !== "test" }));
app.use(currentUser);
// Basic route
app.use(createTicketRouter)
app.use(showTicketRouter)

app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler as express.ErrorRequestHandler);

export {app}