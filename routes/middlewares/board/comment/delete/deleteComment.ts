import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';
import Board from '@Model/board.model';
import BoardComment from '@Model/boardComment.model';
import User from '@Model/user.model';

const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
  const board_pk = req.query.board_pk;
  const comment_pk = req.query.comment_pk;
  const user: User = res.locals.user;

  try {
    const board: Board = await Board.findOne({
      where: {
        pk: board_pk,
      },
      include: [
        {
          model: BoardComment,
          where: {
            pk: comment_pk,
            user_pk: user.pk,
          },
          as: 'boardComment',
        },
      ],
    });

    if (board) {
      if (board.boardComment[0]) {
        await board.boardComment[0].destroy();
        res.json({
          success: true,
        });
      } else {
        next(new CustomError({ name: 'Not_Found_Comment' }));
      }
    } else {
      next(new CustomError({ name: 'Not_Found_Board' }));
    }
  } catch (error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
};

export default deleteComment;
