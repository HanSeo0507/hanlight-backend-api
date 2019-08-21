import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';

import Recruit from '@Model/recruit.model';
import RecruitAnswer from '@Model/recruitAnswer.model';
import RecruitAnswerer from '@Model/recruitAnswerer.model';
import User from '@Model/user.model';

const getAnswer = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;
  const answerer_pk = req.query.answerer_pk;
  const recruit_pk = req.query.recruit_pk;

  try {
    console.log(answerer_pk);

    const recruit: Recruit | null = await Recruit.findOne({
      where: {
        pk: recruit_pk,
        user_pk: user.pk,
      },
      include: [
        {
          model: RecruitAnswerer,
          where: {
            pk: answerer_pk,
          },
          required: false,
          include: [
            {
              model: RecruitAnswer,
              attributes: ['question_pk', 'answer'],
            },
          ],
        },
      ],
    });

    if (recruit) {
      if (recruit.recruitAnswerer.length) {
        res.json({
          success: true,
          data: {
            answer: recruit.recruitAnswerer[0].recruitAnswer,
          },
        });
      } else {
        next(new CustomError({ name: 'Not_Found', message: '존재하지 않는 답변자입니다.' }));
      }
    } else {
      next(new CustomError({ name: 'Not_Found', message: '존재하지 않는 모집입니다.' }));
    }
  } catch (error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
};

export default getAnswer;
