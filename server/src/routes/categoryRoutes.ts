import express, { NextFunction, Request, Response } from 'express';
import { searchCategories } from '../controllers/categoryController';

const router = express.Router();

router.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  let queryResult;
  try {
    queryResult = await searchCategories();
  } catch (err: any) {
    return next(err);
  }

  res.send(queryResult);
});

export default router;