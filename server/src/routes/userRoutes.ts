import express, { NextFunction, Request, Response } from 'express';

import { createUser } from '../controllers/userController';
import checkForExistingUser from '../services/checkForExistingUser';
import hashPassword from '../services/hashPassword';
import validateUserCreds from '../services/validateUserCreds';
import { IUser } from '../utils/types';

const router = express.Router();

router.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
  const credentials: IUser = req.body;

  try {
    const validatedUser: IUser = await validateUserCreds(credentials)
    await checkForExistingUser(validatedUser);
    const hashedUser: IUser = await hashPassword(validatedUser);
    await createUser(hashedUser);
  } catch (err: any) {
    return next(err);
  }

  res.status(201)
      .send({
        message: 'User created.'
      });
});

export default router;