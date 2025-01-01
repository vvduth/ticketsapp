import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";

import cookieSession from "cookie-session";

import { currentUserRouter } from "./routes/current-user";
import { signupRouter } from "./routes/signup";
import { singInRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";
import "express-async-errors";

const app = express();
app.set("trust proxy", true);


// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(cookieSession({ signed: false, secure: true }));

// Basic route
app.use(currentUserRouter);
app.use(signupRouter);
app.use(singInRouter);
app.use(signoutRouter);

app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler as express.ErrorRequestHandler);

export {app}