import { NextFunction, request, Request, response, Response } from 'express';

import CustomError from '@Middleware/error/customError';
import User from '@Model/user.model';

const signKeyCheck = (req: Request, res: Response, next: NextFunction) => {
  const signKey: string = req.body.signKey;

  User.findOne({
    where: {
      id: null,
      signKey,
    },
  })
    .then(user => {
      if (user) {
        res.locals.user = user;
        next();
      } else {
        next(new CustomError({ name: 'Not_User', message: '잘못된 키이거나 이미 회원가입을 한 유저입니다.' }));
      }
    })
    .catch(err => {
      console.log(err);
      next(new CustomError({ name: 'Database_Error' }));
    });
};

export default signKeyCheck;
