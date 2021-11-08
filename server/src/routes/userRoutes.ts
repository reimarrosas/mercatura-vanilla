import express, { NextFunction, Request, Response } from 'express';

import { createUser } from '../controllers/userController';
import hashPassword from '../services/hashPassword';
import validateUserCreds from '../services/validateUserCreds';
import errorThrower from '../utils/errorThrower';
import HttpError from '../utils/httpError';
import { IUser } from '../utils/types';

const router = express.Router();

router.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
  const credentials: IUser = req.body;

  try {
    errorThrower(await validateUserCreds(credentials));
    const hashedUser: IUser = await hashPassword(credentials);

    errorThrower(await createUser(hashedUser));
  } catch (err) {
    console.log(`It's HERE!! ${err}`);
    return next(err);
  }

  res.status(201)
      .send({
        message: 'User created.'
      });
});

export default router;