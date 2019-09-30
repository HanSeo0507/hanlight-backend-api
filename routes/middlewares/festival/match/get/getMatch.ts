import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';

import Match from '@Model/match.model';
import User from '@Model/user.model';

const getMatch = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;

  try {
    const match: Match = await Match.findOne({
      where: {
        user_pk: user.pk,
      },
    });

    if (match) {
      res.json({
        success: true,
        data: {
          match: {
            lotteryNumber: match.lotteryNumber,
          },
        },
      });
    } else {
      next(new CustomError({ name: 'Unhandled_Error' }));
    }
  } catch (err) {
    console.log(err);
    next(new CustomError({ name: 'Database_Error' }));
  }
};

export default getMatch;
