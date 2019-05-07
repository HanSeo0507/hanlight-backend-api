import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';
import User from '@Model/user.model';

const phoneCheck = (req: Request, res: Response, next: NextFunction) => {
  User.findOne({
    where: {
      tp: res.locals.temp.tp,
    },
  })
    .then(user => {
      if (user) {
        next(new CustomError({ name: 'Exist_User', message: '사용 중인 전화번호입니다.' }));
      } else {
        next();
      }
    })
    .catch(err => {
      console.log(err);
      next(new CustomError({ name: 'Database_Error' }));
    });
};

export default phoneCheck;
