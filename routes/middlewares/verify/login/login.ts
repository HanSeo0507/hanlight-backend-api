import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';
import User from '@Model/user.model';

const login = (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;
  const requestPassword = res.locals.temp.password;

  if (user.password === requestPassword) {
    next();
  } else {
    next(new CustomError({ name: 'Not_User' }));
  }
};

export default login;
