import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';

import TimeTable from '@Model/timeTable.model';
import TimeTableLog from '@Model/timeTableLog.model';
import User from '@Model/user.model';

const postTimeTable = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;
  const major: TimeTable['major'] = req.body.major;
  const grade: TimeTable['grade'] = parseInt(req.body.grade, 10);
  const classNum: TimeTable['classNum'] = parseInt(req.body.classNum, 10);
  const day: TimeTable['day'] = req.body.day;
  const detail: TimeTable['detail'] = req.body.detail;
  const th: TimeTable['th'] = parseInt(req.body.th, 10);

  try {
    const duplicate: TimeTable = await TimeTable.findOne({
      where: {
        major,
        grade,
        classNum,
        day,
        th,
      },
    });

    if (!duplicate) {
      const [timeTable]: [TimeTable, unknown] = await Promise.all([
        TimeTable.create({
          major,
          grade,
          classNum,
          day,
          detail,
          th,
        }),
        TimeTableLog.create({
          type: 'C',
          user_pk: user.pk,
          major,
          grade,
          classNum,
        }),
      ]);

      res.json({
        success: true,
        data: {
          timeTable,
        },
      });
    } else {
      next(new CustomError({ name: 'Exist_Data' }));
    }
  } catch (error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
};

export default postTimeTable;
