import { Express, Request, Response } from 'express';

const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get('/', (_req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});