import express, { Express, Request, Response } from 'express';
import userRouter from './api/routes/User.route';
import cors from 'cors';
import 'dotenv/config';
import { ErrorHandler } from '@api/middlewares/ErrorHandler';

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

app.use('/api/v1/auth', userRouter);

app.use(ErrorHandler.handler);

app.get('/', (_req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
