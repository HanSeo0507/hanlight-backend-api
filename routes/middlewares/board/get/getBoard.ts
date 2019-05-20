import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';

import Board from '@Model/board.model';
import BoardComment from '@Model/boardComment.model';
import BoardCommentLike from '@Model/boardCommentLike.model';
import BoardLike from '@Model/boardLike.model';
import BoardPatchLog from '@Model/boardPatchLog.model';
import User from '@Model/user.model';

const getBoard = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;
  const board_limit = 10;
  const comment_limit = 3;
  const page = (req.query.page && req.query.page - 1) || 0;

  try {
    const boardResult: Board[] = await Board.findAll({
      limit: board_limit,
      offset: page * board_limit,
      attributes: ['pk', 'user_name', 'content', 'createdAt'],
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: BoardPatchLog,
          attributes: ['pk'],
        },
        {
          model: BoardComment,
          attributes: ['pk', 'user_name', 'content', 'createdAt'],
          limit: comment_limit,
          include: [
            {
              model: BoardPatchLog,
              attributes: ['pk'],
            },
            {
              model: BoardCommentLike,
              attributes: ['user_pk'],
            },
          ],
        },
        {
          model: BoardLike,
          attributes: ['user_pk'],
        },
      ],
    });

    const commentResult: BoardComment[] = await BoardComment.findAll({
      where: { board_pk: boardResult.map(val => val.pk) },
      attributes: ['board_pk'],
    });

    res.json({
      success: true,
      data: {
        board: boardResult.map(val => {
          const comments = val.comment.map(comment => ({
            pk: comment.pk,
            user_name: comment.user_name,
            content: comment.content,
            createdAt: comment.createdAt,
            edited: !!comment.boardPatchLog.length,
            isLiked: comment.boardCommentLike.some(val => val.user_pk === user.pk),
            likeCount: comment.boardCommentLike.length,
          }));

          return {
            pk: val.pk,
            user_name: val.user_name,
            content: val.content,
            edited: !!val.boardPatchLog.length,
            createdAt: val.createdAt,
            isLiked: val.boardLike.some(val => val.user_pk === user.pk),
            likeCount: val.boardLike.length,
            commentCount: commentResult.filter(comment => comment.board_pk === val.pk).length,
            comment: comments,
          };
        }),
      },
    });
  } catch (error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
};

export default getBoard;
