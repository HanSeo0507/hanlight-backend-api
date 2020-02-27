import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';
import TimeTable from '@Model/timeTable.model';
import TimeTableLog from '@Model/timeTableLog.model';
import User from '@Model/user.model';

const deleteTimeTable = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;
  const major: string = req.query.major;
  const grade: number = parseInt(req.query.grade, 10);
  const classNum: number = parseInt(req.query.classNum, 10);
  const day: string = req.query.day;
  const th: number = parseInt(req.query.th, 10);

  try {
    const timeTable: TimeTable = await TimeTable.findOne({
      where: {
        major,
        grade,
        classNum,
        day,
        th,
      },
    });

    if (timeTable) {
      await Promise.all([
        timeTable.destroy(),
        TimeTableLog.create({
          type: 'D',
          user_pk: user.pk,
          major,
          grade,
          classNum,
        }),
      ]);

      res.json({
        success: true,
      });
    } else {
      next(new CustomError({ name: 'Wrong_Data' }));
    }
  } catch (error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
};

export default deleteTimeTable;
