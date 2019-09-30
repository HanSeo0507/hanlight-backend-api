import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';

import LOLTeam from '@Model/LOLTeam.model';
import LOLVote from '@Model/LOLVote.model';
import User from '@Model/user.model';

import { Body } from './_validation';

const postLOLVote = async (req: Request, res: Response, next: NextFunction) => {
  const { team_pk }: Body = req.body;
  const user: User = res.locals.user;

  try {
    const team: LOLTeam = await LOLTeam.findOne({
      where: {
        pk: team_pk,
      },
    });
    if (team) {
      const [vote, created]: [LOLVote, boolean] = await LOLVote.findOrCreate({
        where: {
          user_pk: user.pk,
        },
        defaults: {
          team_pk: team.pk,
          user_pk: user.pk,
        },
      });

      if (created) {
        res.json({
          success: true,
          data: {
            LOLVote: {
              team_pk: team.pk,
              team_name: team.name,
            },
          },
        });
      } else {
        next(new CustomError({ name: 'Exist_Data', message: '이미 투표를 완료했습니다.' }));
      }
    } else {
      next(new CustomError({ name: 'Not_Found', message: '존재하지 않는 팀입니다.' }));
    }
  } catch (err) {
    console.log(err);
    next(new CustomError({ name: 'Database_Error' }));
  }
};

export default postLOLVote;
