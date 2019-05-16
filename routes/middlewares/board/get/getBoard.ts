import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';

import Board from '@Model/board.model';
import BoardComment from '@Model/boardComment.model';
import BoardPatchLog from '@Model/boardPatchLog.model';

const getBoard = async (req: Request, res: Response, next: NextFunction) => {
  const board_limit = 10;
  const comment_limit = 3;
  const page = (req.query.page && req.query.page - 1) || 0;

  try {
    const result: Board[] = await Board.findAll({
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
          ],
        },
      ],
    }).map((val: Board) => {
      const comments = val.comment.map(comment => ({
        pk: comment.pk,
        user_name: comment.user_name,
        content: comment.content,
        createdAt: comment.createdAt,
        edited: !!comment.boardPatchLog.length,
      }));

      return {
        pk: val.pk,
        user_name: val.user_name,
        content: val.content,
        edited: !!val.boardPatchLog.length,
        createdAt: val.createdAt,
        commentLength: val.comment.length,
        comment: comments,
      };
    });

    res.json({
      success: true,
      data: {
        board: result,
      },
    });
  } catch (error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
};

export default getBoard;
