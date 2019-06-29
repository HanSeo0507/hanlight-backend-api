import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';
import BoardComment from '@Model/boardComment.model';
import User from '@Model/user.model';

const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
  const board_pk = req.query.board_pk;
  const comment_pk = req.query.comment_pk;
  const user: User = res.locals.user;

  try {
    const comment = await BoardComment.findOne({
      where: {
        pk: comment_pk,
        board_pk,
        user_pk: user.pk,
      },
    });

    if (comment) {
      await comment.destroy();
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

export default deleteComment;
