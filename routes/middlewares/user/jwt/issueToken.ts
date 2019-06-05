import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import deleteUndefined from '@Lib/deleteUndefined';
import User from '@Model/user.model';

const issueToken = (type: 'login' | 'none') => (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;
  const tokenSecret = process.env.TOKEN_SECRET;
  const accessToken = jwt.sign(
    {
      pk: user.pk,
    },
    tokenSecret
  );

  const response = {
    accessToken,
    user:
      type === 'login'
        ? {
            type: user.type,
            admin: user.admin,
            name: user[user.type].name,
            major: user.type === 'student' ? user.student.major : null,
            grade: user.type === 'student' ? user.student.grade : null,
            classNum: user.type === 'student' ? user.student.classNum : null,
            studentNum: user.type === 'student' ? user.student.studentNum : null,
          }
        : undefined,
  };

  deleteUndefined(response);

  res.json({
    success: true,
    data: response,
  });
};

export default issueToken;
