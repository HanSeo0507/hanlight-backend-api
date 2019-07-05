import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';

import Board from '@Model/board.model';
import BoardComment from '@Model/boardComment.model';
import BoardReportLog from '@Model/boardReportLog.model';
import User from '@Model/user.model';

const report = async (req: Request, res: Response, next: NextFunction) => {
  const type: 'board' | 'comment' = req.body.type;
  const board_pk: number = req.body.board_pk;
  const comment_pk: number = req.body.comment_pk;
  const content: string = req.body.content;
  const user: User = res.locals.user;
  const include =
    type === 'board'
      ? undefined
      : [
          {
            model: BoardComment,
            where: {
              pk: comment_pk,
            },
            required: false,
          },
        ];

  try {
    const board = await Board.findOne({
      where: {
        pk: board_pk,
        user_pk: user.pk,
      },
      include,
    });

    if (board) {
      if (type === 'comment' && !board.comment[0]) {
        next(new CustomError({ name: 'Not_Found_Comment' }));
      } else {
        const shouldBeReported: Board | BoardComment =
          type === 'comment'
            ? await BoardComment.findOne({
                where: {
                  pk: comment_pk,
                  board_pk,
                },
              })
            : await Board.findOne({
                where: {
                  pk: board_pk,
                },
              });

        if (shouldBeReported) {
          const [result, created]: [BoardReportLog, boolean] = await BoardReportLog.findOrCreate({
            where: {
              type,
              board_pk,
              comment_pk: comment_pk || null,
              user_pk: user.pk,
            },
            defaults: {
              type,
              board_pk,
              comment_pk: comment_pk || null,
              user_pk: user.pk,
              user_name: user[user.type].name,
              content: content || null,
            },
          });

          if (!created && result.content !== content) {
            await result.update({
              content,
            });
          }

          res.json({
            success: true,
          });
        } else {
          next(new CustomError({ name: 'Wrong_Data' }));
        }
      }
    } else {
      next(new CustomError({ name: 'Not_Found_Board' }));
    }
  } catch (error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
};

export default report;
