import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';
import Student from '@Model/student.model';
import Teacher from '@Model/teacher.model';
import User from '@Model/user.model';

const getUserFromToken = async (req: Request, res: Response, next: NextFunction) => {
  const pk = res.locals.user.pk;
  try {
    const user: User | undefined = await User.findOne({
      where: {
        pk,
      },
      include: [
        {
          model: Teacher,
        },
        {
          model: Student,
        },
      ],
    });

    if (user) {
      res.locals.user = user;
      next();
    } else {
      next(new CustomError({ name: 'Wrong_Request' }));
    }
  } catch (error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
};

export default getUserFromToken;
