import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';

import Board from '@Model/board.model';
import BoardImage from '@Model/boardImage.model';
import User from '@Model/user.model';

const postBoard = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;
  const content: Board['content'] = req.body.content;
  const files: string[] = (res.locals.temp && res.locals.temp.files) || [];
  const anonymous = req.body.anonymous ? parseInt(req.body.anonymous, 10) : false;

  try {
    const board: Board = await Board.create(
      {
        user_pk: user.pk,
        content,
        boardImage: files.map(file => ({ file })),
      },
      {
        include: [
          {
            model: BoardImage,
            as: 'boardImage',
          },
        ],
      }
    );

    res.json({
      success: true,
      data: {
        board: {
          pk: board.pk,
          user_name: user.name,
          user_image: !anonymous && user.image ? `https://s3.ap-northeast-2.amazonaws.com/hanlight/profile-image/${user.image}` : null,
          content: board.content,
          createdAt: board.createdAt,
          files: board.boardImage.map(
            (boardImage: BoardImage) => `https://s3.ap-northeast-2.amazonaws.com/hanlight/board/${boardImage.file}`
          ),
        },
      },
    });
  } catch (error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
};

export default postBoard;
