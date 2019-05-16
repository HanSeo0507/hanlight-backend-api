import { NextFunction, Request, Response } from 'express';

import User from '@Model/user.model';

import CustomError from '@Middleware/error/customError';

const checkUserType = (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;

  if (user.type === 'student' || user.type === 'graduate') {
    next();
  } else {
    next(new CustomError({ name: 'Forbidden' }));
  }
};

export default checkUserType;
