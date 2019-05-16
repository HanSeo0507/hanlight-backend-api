import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';

import Board from '@Model/board.model';
import User from '@Model/user.model';

const postBoard = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;
  const content: string = req.body.content;

  try {
    const result: Board = await Board.create({
      user_pk: user.pk,
      user_name: user.student.name,
      content,
    });

    await res.json({
      success: true,
      data: {
        board: {
          pk: result.pk,
          user_name: result.user_name,
          content: result.content,
          createdAt: result.createdAt,
        },
      },
    });
  } catch (error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
};

export default postBoard;
