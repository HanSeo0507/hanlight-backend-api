import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';

import BoardComment from '@Model/boardComment.model';
import BoardManageLog from '@Model/boardManageLog.model';
import User from '@Model/user.model';
import Board from '@Model/board.model';

const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;
  const pk: Board['pk'] = req.body.board_pk;
  const reason: BoardManageLog['reason'] = req.body.content;

  try {
    const comment: BoardComment = await BoardComment.findOne({ where: { pk } });

    if (comment) {
      await Promise.all([
        comment.destroy(),
        BoardManageLog.create({
          board_pk: comment.board_pk,
          user_pk: user.pk,
          type: 'comment',
          reason,
        }),
      ]);

      res.json({
        success: true,
      });
    } else {
      next(new CustomError({ name: 'Wrong_Data' }));
    }
  } catch (error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
};

export default deleteComment;
