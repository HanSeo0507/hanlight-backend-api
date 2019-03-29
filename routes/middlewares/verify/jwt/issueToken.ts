import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import User from '@Model/user.model';

const issueToken = (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;
  const tokenSecret = process.env.TOKEN_SECRET;
  const accessToken = jwt.sign(
    {
      pk: user.pk,
    },
    tokenSecret
  );
  res.json({
    success: true,
    data: {
      accessToken,
      user: {
        type: user.type,
        admin: user.admin,
        name: (user.student && user.student.name) || user.teacher.name,
        major: user.student ? user.student.major : null,
        grade: user.student ? user.student.grade : null,
        classNum: user.student ? user.student.classNum : null,
        studentNum: user.student ? user.student.studentNum : null,
      },
    },
  });
};

export default issueToken;
