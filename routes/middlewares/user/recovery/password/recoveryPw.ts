import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';
import User from '@Model/user.model';

const recoveryPw = async (req: Request, res: Response, next: NextFunction) => {
  const { tp, password, passwordKey }: { tp: string; password: string; passwordKey: string } = res.locals.temp;
  const id: string = req.body.id;

  try {
    const user = await User.findOne({ where: { id, tp } });
    if (user) {
      await user.update({ password, passwordKey });
      await res.json({
        success: true,
      });
    } else {
      next(new CustomError({ name: 'Not_User', message: '일치하는 유저가 없습니다.' }));
    }
  } catch (error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
};

export default recoveryPw;
