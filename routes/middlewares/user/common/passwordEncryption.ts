import { pbkdf2Sync, randomBytes } from 'crypto';
import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';
import * as encryptionJson from '../../../../config/encryption.json';

const passwordEncryption = (req: Request, res: Response, next: NextFunction) => {
  const password: string = req.body.password;
  const { algorithm, saltSize, iteration, encryptionSize } = encryptionJson;

  try {
    const salt = res.locals.user.passwordKey || randomBytes(saltSize).toString('base64');
    const key = pbkdf2Sync(password, salt, iteration, encryptionSize, algorithm).toString('base64');

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
