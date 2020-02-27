import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';

import Board from '@Model/board.model';
import BoardComment from '@Model/boardComment.model';
import BoardCommentLike from '@Model/boardCommentLike.model';
import BoardImage from '@Model/boardImage.model';
import BoardLike from '@Model/boardLike.model';
import BoardPatchLog from '@Model/boardPatchLog.model';
import User from '@Model/user.model';

const getBoard = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;
  const board_limit = 10;
  const comment_limit = 3;
  const page = (req.query.page && req.query.page - 1) || 0;

  try {
    const result: { rows: Board[]; count: number } = await Board.findAndCountAll({
      limit: board_limit,
      offset: page * board_limit,
      attributes: ['pk', 'user_pk', 'content', 'createdAt'],
      order: [['createdAt', 'DESC']],
      distinct: true,
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name', 'image'],
        },
        {
          model: BoardPatchLog,
          as: 'boardPatchLog',
          attributes: ['pk'],
        },
        {
          model: BoardComment,
          as: 'boardComment',
          attributes: ['pk', 'user_pk', 'content', 'createdAt'],
          order: [['createdAt', 'DESC']],
          limit: comment_limit,
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['name', 'image'],
            },
            {
              model: BoardPatchLog,
              as: 'boardPatchLog',
              attributes: ['pk'],
              limit: 1,
            },
            {
              model: BoardCommentLike,
              as: 'boardCommentLike',
              attributes: ['user_pk'],
            },
          ],
        },
        {
          model: BoardLike,
          as: 'boardLike',
          attributes: ['user_pk'],
        },
        {
          model: BoardImage,
          as: 'boardImage',
        },
      ],
    });

    const commentResult: BoardComment[] = await BoardComment.findAll({
      where: { board_pk: result.rows.map(val => val.pk) },
      attributes: ['board_pk'],
    });

    res.json({
      success: true,
      data: {
        board: result.rows.map(val => ({
          pk: val.pk,
          user_name: val.user.name,
          user_image:
            val.user.name && val.user.image ? `https://s3.ap-northeast-2.amazonaws.com/hanlight/profile-image/${val.user.image}` : null,
          content: val.content,
          files: val.boardImage.map(
            (boardImage: BoardImage) => `https://s3.ap-northeast-2.amazonaws.com/hanlight/board/${boardImage.file}`
          ),
          edited: !!val.boardPatchLog.length,
          createdAt: val.createdAt,
          isLiked: val.boardLike.some(val => val.user_pk === user.pk),
          likeCount: val.boardLike.length,
          commentCount: commentResult.filter(comment => comment.board_pk === val.pk).length,
          comment: val.boardComment.map(comment => ({
            pk: comment.pk,
            user_name: comment.user.name,
            user_image:
              comment.user.name && comment.user.image
                ? `https://s3.ap-northeast-2.amazonaws.com/hanlight/profile-image/${comment.user.image}`
                : null,
            content: comment.content,
            createdAt: comment.createdAt,
            edited: !!comment.boardPatchLog.length,
            isLiked: comment.boardCommentLike.some(val => val.user_pk === user.pk),
            likeCount: comment.boardCommentLike.length,
            write: comment.user_pk === user.pk,
          })),
          write: val.user_pk === user.pk,
        })),
        resultCount: result.count,
      },
    });
  } catch (error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
};

export default getBoard;
