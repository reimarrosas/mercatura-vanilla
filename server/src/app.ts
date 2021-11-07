import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';

const app = express();

app.use(cors());
app.use(helmet());

const PORT = process.env['PORT'] ?? 5131;

app.get('/', (_req: Request, res: Response) => {
  res.send({
    message: 'Endpoint Working'
  });
});

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});