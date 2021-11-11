import express, { NextFunction, Request, Response } from 'express';
import { searchCommentsByProductID } from '../controllers/commentController';
import commentQueryValidator from '../services/schemaValidators/commentQueryValidator';
import validateObject from '../services/validateObject';

const router = express.Router();

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const { id: productId } = req.params;
  const { limit, offset } = req.query;
  let queryResult;

  try {
    const {
      productId: valId,
      limit: valLimit,
      offset: valOffset
    } = await validateObject({ productId, limit, offset }, commentQueryValidator);

    queryResult = await searchCommentsByProductID(
      parseInt(valId),
      parseInt(valLimit as string),
      parseInt(valOffset as string)
    );
  } catch (err: any) {
    return next(err);
  }

  res.send({
    queryResult
  })
});

export default router;