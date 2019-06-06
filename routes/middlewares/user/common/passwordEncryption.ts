import * as dotenv from 'dotenv';

import { pbkdf2Sync, randomBytes } from 'crypto';
import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';

dotenv.config();

const passwordEncryption = (req: Request, res: Response, next: NextFunction) => {
  const password: string = req.body.password;
  const ENCRYPTION_SET = {
    ENCRYPTION_ALGORITHM: process.env.ENCRYPTION_ALGORITHM,
    ENCRYPTION_ITERATION: parseInt(process.env.ENCRYPTION_ITERATION),
    ENCRYPTION_SALTSIZE: parseInt(process.env.ENCRYPTION_SALTSIZE),
    ENCRYPTION_SIZE: parseInt(process.env.ENCRYPTION_SIZE),
  };

  try {
    const salt = (res.locals.user && res.locals.user.passwordKey) || randomBytes(ENCRYPTION_SET.ENCRYPTION_SALTSIZE).toString('base64');
    const key = pbkdf2Sync(
      password,
      salt,
      ENCRYPTION_SET.ENCRYPTION_ITERATION,
      ENCRYPTION_SET.ENCRYPTION_SIZE,
      ENCRYPTION_SET.ENCRYPTION_ALGORITHM
    ).toString('base64');

    res.locals.temp = {
      ...res.locals.temp,
      password: key,
      passwordKey: salt,
    };
    next();
  } catch (error) {
    console.log(error);
    next(new CustomError({ name: 'Unhandled_Error', message: error.message }));
  }
};

export default passwordEncryption;
