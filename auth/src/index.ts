import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { currentUserRouter } from './routes/current-user';
import { signUprouter } from './routes/signup';
import { singInRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';
import 'express-async-errors'

const app: Application = express();
const port: number = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());


// Basic route
app.use(currentUserRouter)
app.use(signUprouter)
app.use(singInRouter)
app.use(signoutRouter)

app.all('*',  () => {
    throw new NotFoundError();
})

app.use(errorHandler as express.ErrorRequestHandler);


// Start the server
app.listen(port, () => {
    console.log(`Server is running  on http://localhost:${port}`);
});