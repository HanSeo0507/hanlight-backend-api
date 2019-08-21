import { NextFunction, Request, Response } from 'express';

import User from '@Model/user.model';

import CustomError from '@Middleware/error/customError';

const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;
  const file: string = res.locals.temp.file;
  const past_updatedAt = user.updatedAt;

  try {
    res.locals.user = await User.update(
      {
        image: file,
        updatedAt: past_updatedAt,
      },
      {
        where: {
          pk: user.pk,
        },
      }
    );
    next();
  } catch (error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
};

export default updateProfile;
