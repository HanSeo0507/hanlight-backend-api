import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';

import Board from '@Model/board.model';
import BoardComment from '@Model/boardComment.model';
import User from '@Model/user.model';

const postComment = async (req: Request, res: Response, next: NextFunction) => {
  const board_pk: number = req.body.board_pk;
  const content: string = req.body.content;
  const user: User = res.locals.user;

  try {
    const board: Board = await Board.findOne({
      where: {
        pk: board_pk,
      },
    });

    if (board) {
      const comment: BoardComment = await BoardComment.create({
        board_pk,
        content,
        user_pk: user.pk,
        user_name: user[user.type].name,
      });

      await res.json({
        success: true,
        data: {
          comment: {
            pk: comment.pk,
            user_name: comment.user_name,
            content: comment.content,
            createdAt: comment.createdAt,
          },
        },
      });
    } else {
      next(new CustomError({ name: 'Not_Found' }));
    }
  } catch (error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
};

export default postComment;
