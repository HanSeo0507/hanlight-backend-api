import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';
import Recruit from '@Model/recruit.model';
import RecruitQuestion from '@Model/recruitQuestion.model';
import RecruitQuestionSelect from '@Model/recruitQuestionSelect.model';
import User from '@Model/user.model';

const postRecruit = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;
  const name: string = req.body.name;
  const description: string = req.body.name;
  const dueAt: Date = new Date(req.body.dueAt);
  const questions: Array<{
    type: 'long' | 'short' | 'select';
    question: string;
    selects: null | string[];
  }> = req.body.questions;

  if (dueAt instanceof Date) {
    dueAt.setHours(23);
    dueAt.setMinutes(59);
    dueAt.setSeconds(59);
  }

  try {
    const recruit: Recruit = await Recruit.create(
      {
        user_pk: user.pk,
        user_name: user[user.type].name,
        name,
        description,
        dueAt: isNaN(dueAt.getTime()) ? null : dueAt,
        recruitQuestion: questions.map(question =>
          question.type === 'select'
            ? {
                question: question.question,
                type: question.type,
                recruitQuestionSelect: question.selects.map(select => ({ select })),
              }
            : {
                question: question.question,
                type: question.type,
              }
        ),
      },
      {
        include: [
          {
            model: RecruitQuestion,
            include: [
              {
                model: RecruitQuestionSelect,
              },
            ],
          },
        ],
      }
    );

    res.json({
      success: true,
      data: {
        recruit: {
          pk: recruit.pk,
          user_name: recruit.user_name,
          name: recruit.name,
          description: recruit.description,
          dueAt: recruit.dueAt,
          recruitQuestion: recruit.recruitQuestion,
          updatedAt: recruit.updatedAt,
          createdAt: recruit.createdAt,
        },
      },
    });
  } catch (error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
};

export default postRecruit;
