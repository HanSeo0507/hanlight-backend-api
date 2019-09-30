import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';

import Singer from '@Model/singer.model';
import SingerVote from '@Model/singerVote.model';
import User from '@Model/user.model';

const getSinger = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;

  try {
    const singer: Singer[] = await Singer.findAll({
      order: [['pk', 'ASC']],
      include: [
        {
          model: SingerVote,
          attributes: ['user_pk'],
        },
      ],
    });

    res.json({
      success: true,
      data: {
        singer: singer.map(val => ({
          pk: val.pk,
          name: val.name,
          isVote: val.singerVote.some(vote => vote.user_pk === user.pk),
        })),
      },
    });
  } catch (err) {
    console.log(err);
    next(new CustomError({ name: 'Database_Error' }));
  }
};

export default getSinger;
