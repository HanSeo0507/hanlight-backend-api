import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';
import Board from '@Model/board.model';
import BoardComment from '@Model/boardComment.model';
import BoardCommentLike from '@Model/boardCommentLike.model';
import BoardLike from '@Model/boardLike.model';
import User from '@Model/user.model';

const getBoardLike = async (req: Request, res: Response, next: NextFunction) => {
  const type: 'board' | 'comment' = req.query.type;
  const board_pk: number = req.query.board_pk;
  const comment_pk: number | undefined = req.query.comment_pk;

  try {
    const board: Board = await Board.findOne({
      where: {
        pk: board_pk,
      },
      include:
        type === 'comment'
          ? [
              {
                model: BoardComment,
                where: {
                  pk: comment_pk,
                },
                required: false,
                include: [
                  {
                    model: BoardCommentLike,
                  },
                ],
              },
            ]
          : [
              {
                model: BoardLike,
              },
            ],
    });
  
    if (board) {
      if (type === 'comment' && !board.comment.length) {
        next(new CustomError({ name: 'Not_Found_Comment' }));
      } else {
        const user: User[] = await User.findAll({
          where: {
            pk: type === 'board' ? board.boardLike.map(like => like.user_pk) : board.comment[0].boardCommentLike.map(like => like.user_pk),
          },
          attributes: []
        })
  
        res.json({
          success: true,
          data: {
            like: type === 'board' ? board.boardLike : board.comment[0].boardCommentLike,
          },
        });
      }
    } else {
      next(new CustomError({ name: 'Not_Found_Board' }));
    }
  } catch (error) {
    console.log(error)
    next(new CustomError({name: 'Database_Error'}))
  }
};

export default getBoardLike;
