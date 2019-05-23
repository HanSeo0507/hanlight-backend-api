import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';

import Board from '@Model/board.model';
import BoardPatchLog from '@Model/boardPatchLog.model';
import User from '@Model/user.model';

const patchBoard = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;
  const board_pk = req.body.board_pk;
  const current_content = req.body.content;

  try {
    const past_board: Board = await Board.findOne({
      where: {
        pk: board_pk,
        user_pk: user.pk,
      },
    });

    if (past_board && past_board.content !== current_content) {
      const [current_board]: [Board, unknown] = await Promise.all([
        past_board.update({
          content: current_content,
          updatedAt: new Date(),
        }),
        BoardPatchLog.create({
          board_pk,
          user_pk: user.pk,
          past_content: past_board.content,
        }),
      ]);

      res.json({
        success: true,
        data: {
          board: {
            pk: current_board.pk,
            user_name: current_board.user_name,
            content: current_board.content,
            createdAt: current_board.createdAt,
          },
        },
      });
    } else {
      next(new CustomError({ name: 'Wrong_Data' }));
    }
  } catch (error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
};

export default patchBoard;
