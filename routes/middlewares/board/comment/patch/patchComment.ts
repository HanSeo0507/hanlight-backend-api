import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';

import BoardComment from '@Model/boardComment.model';
import BoardPatchLog from '@Model/boardPatchLog.model';
import User from '@Model/user.model';

const patchComment = async (req: Request, res: Response, next: NextFunction) => {
  const board_pk: number = req.query.board_pk;
  const comment_pk: number = req.query.comment_pk;
  const content: string = req.body.content;
  const user: User = res.locals.user;

  try {
    const past_comment: BoardComment = await BoardComment.findOne({
      where: {
        pk: comment_pk,
        board_pk,
        user_pk: user.pk,
      },
    });

    if (past_comment && past_comment.content !== content) {
      const now_comment: BoardComment = await past_comment.update({
        content,
        updatedAt: new Date(),
      });

      await BoardPatchLog.create({
        type: 'comment',
        user_pk: user.pk,
        user_name: user[user.type].name,
        board_pk,
        comment_pk,
        past_content: past_comment.content,
      });

      await res.json({
        success: true,
        data: {
          pk: now_comment.pk,
          user_name: now_comment.user_name,
          content: now_comment.content,
          createdAt: now_comment.createdAt,
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

export default patchComment;
