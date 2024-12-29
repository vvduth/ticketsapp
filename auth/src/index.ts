import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';

const app: Application = express();
const port: number = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Basic route
app.get('/api/users/currentuser', (req: Request, res: Response) => {
    res.send('Hello, world!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running popo on http://localhost:${port}`);
});