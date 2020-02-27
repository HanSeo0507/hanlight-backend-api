import { NextFunction, Request, Response } from 'express';

import User from '@Model/user.model';

const getUser = (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;

  res.json({
    success: true,
    data: {
      user: {
        type: user.type,
        admin: user.adminLevel,
        name: user.name,
        id: user.id,
        major: user.major,
        grade: user.grade,
        classNum: user.classNum,
        studentNum: user.studentNum,
        image: user.image ? `https://s3.ap-northeast-2.amazonaws.com/hanlight/profile-image/${user.image}` : null,
      },
    },
  });
};

export default getUser;
