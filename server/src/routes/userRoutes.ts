import express, { NextFunction, Request, Response } from 'express';

import { createUser } from '../controllers/userController';
import hashPassword from '../services/hashPassword';
import validateUserCreds from '../services/validateUserCreds';
import errorThrower from '../utils/errorThrower';
import { IUser } from '../utils/types';

const router = express.Router();

router.post('signup', async (req: Request, res: Response, next: NextFunction) => {
  const credentials: IUser = req.body;
  try {
    errorThrower(validateUserCreds(credentials));

    const hashedUser: IUser = await hashPassword(credentials);

    errorThrower(await createUser(hashedUser));
  } catch (err) {
    return next(err);
  }
});

export default router;