import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';

import Recruit from '@Model/recruit.model';
import RecruitAnswerer from '@Model/recruitAnswerer.model';
import RecruitQuestion from '@Model/recruitQuestion.model';
import User from '@Model/user.model';

const GET_RECRUIT_LIMIT = 10;

const getRecruit = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;
  const type: 'list' | 'post' = req.query.type;
  const recruit_pk: number | undefined = req.query.recruit_pk;
  const page: number | undefined = req.query.page && parseInt(req.query.page, 10);

  try {
    const recruit: Recruit | { rows: Recruit[]; count: number } | null =
      type === 'post'
        ? await Recruit.findOne({
            where: {
              pk: recruit_pk,
            },
            attributes: ['pk', 'user_pk', 'user_name', 'name', 'description', 'dueAt', 'createdAt'],
            include: [
              {
                model: RecruitQuestion,
                attributes: ['pk', 'question'],
              },
              {
                model: RecruitAnswerer,
                attributes: ['pk', 'user_name', 'createdAt'],
              },
            ],
          })
        : await Recruit.findAndCountAll({
            offset: (page - 1) * GET_RECRUIT_LIMIT,
            limit: GET_RECRUIT_LIMIT,
            order: [['createdAt', 'DESC']],
            attributes: ['pk', 'user_name', 'name', 'description', 'dueAt', 'createdAt'],
          });

    if (type === 'post' && !recruit) {
      next(new CustomError({ name: 'Not_Found', message: '해당 모집이 삭제되었습니다.' }));
    } else {
      res.json({
        success: true,
        recruit:
          recruit instanceof Recruit
            ? {
                pk: recruit.pk,
                user_name: recruit.user_name,
                name: recruit.name,
                description: recruit.description,
                dueAt: recruit.dueAt,
                createdAt: recruit.createdAt,
                recruitQuestion: recruit.recruitQuestion,
                recruitAnswerer: recruit.user_pk === user.pk ? recruit.recruitAnswerer : null,
              }
            : recruit,
      });
    }
  } catch (error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
};

export default getRecruit;
