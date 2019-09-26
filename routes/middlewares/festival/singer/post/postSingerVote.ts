import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';

import Singer from '@Model/singer.model';
import SingerVote from '@Model/singerVote.model';
import User from '@Model/user.model';

import { Body } from './_validation';

const postSingerVote = async (req: Request, res: Response, next: NextFunction) => {
  const { singer_pk }: Body = req.body;
  const user: User = res.locals.user;

  try {
    const singer: Singer = await Singer.findOne({
      where: {
        pk: singer_pk,
      },
    });

    if (singer) {
      const [vote, created]: [SingerVote, boolean] = await SingerVote.findOrCreate({
        where: {
          user_pk: user.pk,
        },
        defaults: {
          singer_pk,
          user_pk: user.pk,
        },
      });

      if (created) {
        res.json({
          success: true,
          data: {
            vote: {
              pk: singer.pk,
              name: singer.name,
            },
          },
        });
      } else {
        next(new CustomError({ name: 'Exist_Data', message: '이미 투표를 완료했습니다.' }));
      }
    } else {
      next(new CustomError({ name: 'Not_Found', message: '존재하지 않는 참가자입니다.' }));
    }
  } catch (err) {
    console.log(err);
    next(new CustomError({ name: 'Database_Error' }));
  }
};

export default postSingerVote;
