import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';

import Board from '@Model/board.model';
import BoardComment from '@Model/boardComment.model';
import BoardPatchLog from '@Model/boardPatchLog.model';

const getComment = async (req: Request, res: Response, next: NextFunction) => {
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
      const comments = await BoardComment.findAll({
        where: {
          board_pk,
        },
        limit,
        offset: page * limit,
        order: [['createdAt', 'DESC']],
        attributes: ['pk', 'user_name', 'content', 'createdAt'],
        include: [
          {
            model: BoardPatchLog,
            attributes: ['pk'],
          },
        ],
      }).map((val: BoardComment) => ({
        pk: val.pk,
        user_name: val.user_name,
        content: val.content,
        createdAt: val.createdAt,
        edited: !!val.boardPatchLog.length,
      }));

      await res.json({
        success: true,
        data: {
          comment: comments,
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

export default getComment;
