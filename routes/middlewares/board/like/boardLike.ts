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
    const board = await Board.findOne({
      where: {
        pk: board_pk,
        user_pk: user.pk,
      },
      include: [
        {
          model: BoardComment,
          where: {
            pk: comment_pk,
          },
          required: false,
        },
      ],
    });

    if (board) {
      if (!(type === 'comment' && board.comment[0])) {
        next(new CustomError({ name: 'Not_Found' }));
      } else {
        const like: BoardLike | BoardCommentLike | undefined =
          type === 'comment'
            ? await BoardCommentLike.findOne({
                where: {
                  board_pk,
                  comment_pk,
                  user_pk: user.pk,
                },
              })
            : await BoardLike.findOne({
                where: {
                  board_pk,
                  user_pk: user.pk,
                },
              });

        if (like) {
          await like.destroy();
        } else {
          if (type === 'comment') {
            await BoardCommentLike.create({
              board_pk,
              comment_pk,
              user_pk: user.pk,
            });
          } else {
            await BoardLike.create({
              board_pk,
              user_pk: user.pk,
            });
          }
        }

        res.json({
          success: true,
        });
      }
    } else {
      next(new CustomError({ name: 'Not_Found_Board' }));
    }
  } catch (error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
};

export default boardLike;
