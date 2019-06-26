import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';

import Board from '@Model/board.model';
import BoardComment from '@Model/boardComment.model';
import BoardCommentLike from '@Model/boardCommentLike.model';
import BoardLike from '@Model/boardLike.model';
import User from '@Model/user.model';

const boardLike = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;
  const type: 'board' | 'comment' = req.body.type;
  const board_pk: number = req.body.board_pk;
  const comment_pk: number | undefined = req.body.comment_pk;

  try {
    const result: Board | BoardComment | undefined =
      type === 'board'
        ? await Board.findOne({ where: { pk: board_pk } })
        : await BoardComment.findOne({
            where: {
              pk: comment_pk,
            },
          });

    if (result) {
      const like: BoardLike | BoardCommentLike | undefined =
        type === 'board'
          ? await BoardLike.findOne({
              where: {
                board_pk,
                user_pk: user.pk,
              },
            })
          : await BoardCommentLike.findOne({
              where: {
                board_pk,
                comment_pk,
                user_pk: user.pk,
              },
            });

      if (like) {
        await like.destroy();
      } else {
        if (type === 'board') {
          await BoardLike.create({
            board_pk,
            user_pk: user.pk,
          });
        } else {
          await BoardCommentLike.create({
            board_pk,
            comment_pk,
            user_pk: user.pk,
          });
        }
      }

      await res.json({
        success: true,
      });
    } else {
      next(new CustomError({ name: 'Not_Found' }));
    }
  } catch (error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
};

export default boardLike;
