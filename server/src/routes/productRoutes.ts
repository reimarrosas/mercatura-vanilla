import express, { Request, Response, NextFunction } from 'express';
import { countProductQueryResult, searchProductBySimilarity } from '../controllers/productController';

const router = express.Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const { search, limit, offset, recount } = req.query;

  const searchQuery = search?.toString() ?? '';
  const [recordNum, pageNum] = [limit, offset].map(Number);
  const isRecount = recount === 'true';

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