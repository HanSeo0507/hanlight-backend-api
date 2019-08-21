import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';

import Recruit from '@Model/recruit.model';
import RecruitAnswer from '@Model/recruitAnswer.model';
import RecruitAnswerer from '@Model/recruitAnswerer.model';
import RecruitQuestion from '@Model/recruitQuestion.model';
import User from '@Model/user.model';
import { sequelize } from 'database';
import { Transaction } from 'sequelize/types';

const postAnswer = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;
  const recruit_pk: number = req.body.recruit_pk;
  const answers: Array<{ question_pk: number; answer: string }> = req.body.answers;

  try {
    sequelize.transaction({ autocommit: true }, async transaction => {
      const recruit: Recruit = await Recruit.findOne({
        where: {
          pk: recruit_pk,
        },
        include: [
          {
            model: RecruitQuestion,
          },
          {
            model: RecruitAnswerer,
            where: {
              user_pk: user.pk,
            },
            required: false,
          },
        ],
        transaction,
        lock: Transaction.LOCK.SHARE,
      });

      if (recruit) {
        if (recruit.recruitAnswerer[0]) {
          next(new CustomError({ name: 'Exist_Data', message: '이미 지원한 모집입니다.' }));
        } else if (new Date(recruit.dueAt) < new Date()) {
          next(new CustomError({ name: 'Forbidden', message: '기간이 지난 모집입니다.' }));
        } else {
          const question_pks: number[] = recruit.recruitQuestion.map(question => question.pk);

          if (question_pks.every(pk => answers.findIndex(answer => answer.question_pk === pk) >= 0) && recruit.user_pk !== user.pk) {
            const answer: RecruitAnswerer = await RecruitAnswerer.create(
              {
                recruit_pk,
                user_pk: user.pk,
                user_name: user[user.type].name,
                recruitAnswer: answers.map(answer => ({
                  recruit_pk,
                  question_pk: answer.question_pk,
                  answer: answer.answer,
                })),
              },
              {
                include: [
                  {
                    model: RecruitAnswer,
                  },
                ],
                transaction,
              }
            );

            res.json({
              success: true,
              data: {
                answer: answer.recruitAnswer.map(val => ({
                  question_pk: val.question_pk,
                  answer: val.answer,
                })),
              },
            });
          } else {
            next(new CustomError({ name: 'Wrong_Data' }));
          }
        }
      } else {
        next(new CustomError({ name: 'Not_Found', message: '존재하지 않는 모집입니다.' }));
      }
    });
  } catch (error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
};

export default postAnswer;
