import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';
import User from '@Model/user.model';

const userExistCheck = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.body;

  User.findOne({
    where: {
      id,
    },
  })
    .then((user: User) => (user ? next(new CustomError({ name: 'Exist_User' })) : next()))
    .catch(err => {
      console.log(err);
      next(new CustomError({ name: 'Database_Error' }));
    });
};

export default userExistCheck;
