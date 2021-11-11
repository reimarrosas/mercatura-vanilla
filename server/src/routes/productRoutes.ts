import express, { Request, Response, NextFunction } from 'express';
import { countProductQueryResult, searchProductBySimilarity } from '../controllers/productController';
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

export default router;