import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';
import Recruit from '@Model/recruit.model';
import User from '@Model/user.model';

const deleteRecruit = async (req: Request, res: Response, next: NextFunction) => {
  const recruit_pk: number | undefined = req.query.recruit_pk;
  const user: User = res.locals.user;

  try {
    const recruit: Recruit = await Recruit.findOne({
      where: {
        pK: recruit_pk,
      },
    });

    if (recruit) {
      if (recruit.user_pk === user.pk) {
        await recruit.destroy();
        res.json({
          success: true,
        });
      } else {
        next(new CustomError({ name: 'Forbidden' }));
      }
    } else {
      next(new CustomError({ name: 'Wrong_Data' }));
    }
  } catch (error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
};

export default deleteRecruit;
