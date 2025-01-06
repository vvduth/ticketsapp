import express, { Request, Response } from 'express';

const router = express.Router();

router.post('/api/orders', (req: Request, res: Response) => {
  res.send('Hello from orders service');
});

export { router as newOrdersRouter };