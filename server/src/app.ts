import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import userRoutes from './routes/userRoutes';
import notFoundHandler from './handlers/notFoundHandler';
import errorHandler from './handlers/errorHandler';

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

const PORT = process.env['PORT'] ?? 5131;

app.get('/', (_req: Request, res: Response) => {
  res.send({
    message: 'Endpoint Working'
  });
});

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});

app.use('/api/users', userRoutes);
app.use(notFoundHandler);
app.use(errorHandler);