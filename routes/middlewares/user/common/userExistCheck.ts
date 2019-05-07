import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';
import Student from '@Model/student.model';
import Teacher from '@Model/teacher.model';
import User from '@Model/user.model';

const userExistCheck = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.body;

  User.findOne({
    where: {
      id,
    },
    include: [
      {
        model: Student,
      },
      {
        model: Teacher,
      },
    ],
  })
    .then((user: User) => {
      switch (req.path) {
        case '/register':
          user ? next(new CustomError({ name: 'Exist_User' })) : next();
          break;
        case '/login':
          if (user) {
            res.locals.user = user;
            next();
          } else {
            next(new CustomError({ name: 'Not_User', message: '등록되지 않은 아이디이거나, 아이디 또는 비밀번호를 잘못 입력하셨습니다.' }));
          }
          break;
      }
    })
    .catch(err => {
      console.log(err);
      next(new CustomError({ name: 'Database_Error' }));
    });
};

export default userExistCheck;
