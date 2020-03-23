import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';

import User from '@Model/user.model';

const getUserFromToken = async (req: Request, res: Response, next: NextFunction) => {
  const tokenDecoded = res.locals.user;
  try {
    const user: User | undefined = await User.findOne({
      where: {
        pk: tokenDecoded.pk,
      },
    });

    if (Number(user.updatedAt) > tokenDecoded.iat * 1000) {
      next(new CustomError({ name: 'Token_Expired' }));
    }

    if (!user) {
      next(new CustomError({ name: 'Wrong_Request' }));
    }

    res.locals.user = user;
    next();
  } catch (error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
};

export default getUserFromToken;
