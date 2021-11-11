import express, { NextFunction, Request, Response } from 'express';
import { addComment, searchCommentsByProductID, updateCommentContent, updateCommentLikeOrDislike } from '../controllers/commentController';
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

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      userId,
      productId,
      content
    } = await validateObject(req.body, commentQueryValidator);

    await addComment(parseInt(userId), parseInt(productId), content);
  } catch (err: any) {
    return next(err);
  }

  res.status(201).send({
    message: 'Comment created.'
  });
});

router.patch('/:id/:sentiment', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, sentiment } = await validateObject(
      { id: req.params.id, sentiment: req.params.sentiment },
      commentQueryValidator
    );

    await updateCommentLikeOrDislike(parseInt(id), sentiment);
  } catch (err: any) {
    return next(err);
  }

  res.send({
    message: `Sentiment ${req.params.sentiment} updated.`
  })
});

export default router;