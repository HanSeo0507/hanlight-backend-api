import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';
import User from '@Model/user.model';

const hanseithonGetUser = async (req: Request, res: Response, next: NextFunction) => {
  const user_pk: string = req.body.user_pk;

  try {
    const user: User = await User.findOne({
      where: {
        pk: user_pk,
      },
    });

    if (user) {
      res.locals.user = user;
      next();
    } else {
      next(new CustomError({ name: 'Wrong_Data' }));
    }
  } catch (error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
};

export default hanseithonGetUser;
