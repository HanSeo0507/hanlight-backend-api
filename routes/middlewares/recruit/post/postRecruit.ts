import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';
import Recruit from '@Model/recruit.model';
import RecruitQuestion from '@Model/recruitQuestion.model';
import User from '@Model/user.model';

const postRecruit = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;
  const name: string = req.body.name;
  const description: string = req.body.name;
  const dueAt: string | null = req.body.dueAt;
  const questions: string[] = req.body.questions;

  try {
    const recruit: Recruit = await Recruit.create(
      {
        user_pk: user.pk,
        user_name: user[user.type].name,
        name,
        description,
        dueAt: dueAt && new Date(dueAt),
        recruitQuestion: questions.map(question => ({
          question,
        })),
      },
      {
        include: [
          {
            model: RecruitQuestion,
          },
        ],
      }
    );

    res.json({
      success: true,
      data: {
        recruit,
      },
    });
  } catch (error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
};

export default postRecruit;
