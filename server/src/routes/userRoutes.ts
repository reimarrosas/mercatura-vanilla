import argon2 from 'argon2';
import express, { NextFunction, Request, Response } from 'express';

import { createUser } from '../controllers/userController';
import checkForExistingUser from '../services/checkForExistingUser';
import hashPassword from '../services/hashPassword';
import loginValidator from '../services/schemaValidators/loginValidator';
import userValidator from '../services/schemaValidators/userValidator';
import validateObject from '../services/validateObject';
import verifyPassword from '../services/verifyPassword';
import generateToken from '../services/generateToken';
import { IUser, Maybe, Token, UserExistenceRoute } from '../utils/types';

const router = express.Router();

router.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
  const credentials: IUser = req.body;

  try {
    const validatedUser: IUser = await validateObject<IUser>(credentials, userValidator);
    await checkForExistingUser(validatedUser, UserExistenceRoute.SIGNUP);
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

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  const user: IUser = req.body;

  try {
    const validatedUser: IUser = await validateObject<IUser>(user, loginValidator);
    const queryResult: Maybe<IUser> = await checkForExistingUser(validatedUser, UserExistenceRoute.LOGIN)
    await verifyPassword(queryResult, validatedUser);
    const token = generateToken(Token.REFRESH, {
      userID: validatedUser.user_id,
      userEmail: validatedUser.user_email
    }, process.env['TOKEN_SECRET'] ?? 'Boots and Cats does not mix.');

    res.cookie('Auth', token, {
      secure: process.env['NODE_ENV'] === 'production',
      httpOnly: true,
      signed: true
    }).status(201)
    .send({ message: 'Login successful.' });
  } catch (err: any) {
    return next(err);
  }
});

export default router;