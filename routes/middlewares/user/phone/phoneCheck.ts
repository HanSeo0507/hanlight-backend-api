import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';
import User from '@Model/user.model';

const phoneCheck = (req: Request, res: Response, next: NextFunction) => {
  User.findOne({
    where: {
      tp: res.locals.temp.tp,
    },
  })
    .then((user: User | undefined) => {
      switch (req.path) {
        case '/recovery/password':
          if (user && user.id === req.body.id) {
            res.locals.user = user;
            next();
          } else {
            next(new CustomError({ name: 'Not_User', message: '존재하지 않는 유저입니다.' }));
          }
          break;

        case '/phone':
          if (user) {
            next(new CustomError({ name: 'Exist_User', message: '사용 중인 전화번호입니다.' }));
          } else {
            next();
          }
          break;
      }
    })
    .catch(err => {
      console.log(err);
      next(new CustomError({ name: 'Database_Error' }));
    });
};

export default phoneCheck;
