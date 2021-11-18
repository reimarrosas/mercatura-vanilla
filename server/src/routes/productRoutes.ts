import express, { Request, Response, NextFunction } from 'express';
import { countProductCategory, countProductQueryResult, searchProductByCategory, searchProductBySimilarity } from '../controllers/productController';
import categoryQueryValidator from '../services/schemaValidators/categoryQueryValidator';
import queryParamValidator from '../services/schemaValidators/productQueryValidator';
import validateObject from '../services/validateObject';

const router = express.Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  let query;
  try {
    query = await validateObject(req.query, queryParamValidator);
  } catch (err: any) {
    return next(err);
  }

  const searchQuery = query.search?.toString() ?? '';
  const [recordNum, pageNum] = [query.limit, query.offset].map(Number);
  const isRecount = query.recount === 'true';

  let count, queryResult;
  try {
    if (isRecount) {
      count = (await countProductQueryResult(searchQuery)).count;
    }
    
    queryResult = await searchProductBySimilarity(searchQuery, recordNum, pageNum);
  } catch (err: any) {
    return next(err);
  }


  res.send({
    count: count ?? -1,
    queryResult
  });
});

router.get('/:category', async (req: Request, res: Response, next: NextFunction) => {
  const category: string = req.params.category;
  const { limit, offset, recount } = req.query;
  let count, queryResult;
  try {
    const validatedParams = await validateObject({ category, limit, offset, recount }, categoryQueryValidator);

    if (recount === 'true') {
      count = (await countProductCategory(validatedParams.category)).count;
    }

    queryResult = await searchProductByCategory(
      validatedParams.category,
      parseInt(validatedParams.limit as string),
      parseInt(validatedParams.offset as string)
    );
  } catch (err: any) {
    return next(err);
  }

  res.send({
    count: count ?? -1,
    result: queryResult
  });
});

export default router;