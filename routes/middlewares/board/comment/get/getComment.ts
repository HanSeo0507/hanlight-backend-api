import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';

import Board from '@Model/board.model';
import BoardComment from '@Model/boardComment.model';
import BoardCommentLike from '@Model/boardCommentLike.model';
import BoardPatchLog from '@Model/boardPatchLog.model';
import User from '@Model/user.model';

const getComment = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;
  const limit = 10;
  const page: number = (req.query.page && req.query.page - 1) || 0;
  const board_pk: number = req.query.board_pk;

  try {
    const board: Board | undefined = await Board.findOne({
      where: {
        pk: board_pk,
      },
    });

    if (board) {
      const comments: { rows: BoardComment[]; count: number } = await BoardComment.findAndCountAll({
        where: {
          board_pk,
        },
        limit,
        offset: page * limit,
        order: [['createdAt', 'DESC']],
        attributes: ['pk', 'user_pk', 'user_name', 'content', 'createdAt'],
        distinct: true,
        include: [
          {
            model: BoardPatchLog,
            attributes: ['pk'],
            limit: 1,
          },
          {
            model: BoardCommentLike,
            attributes: ['user_pk'],
          },
        ],
      });

      res.json({
        success: true,
        data: {
          comment: comments.rows.map((val: BoardComment) => ({
            pk: val.pk,
            user_name: val.user_name,
            content: val.content,
            createdAt: val.createdAt,
            edited: !!val.boardPatchLog.length,
            isLiked: val.boardCommentLike.some(val => val.user_pk === user.pk),
            likeCount: val.boardCommentLike.length,
            write: val.user_pk === user.pk,
          })),
          resultCount: comments.count,
        },
      });
    } else {
      next(new CustomError({ name: 'Not_Found_Board' }));
    }
  } catch (error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
};

export default getComment;
