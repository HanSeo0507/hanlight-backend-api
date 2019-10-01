import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';

import TimeTableFestival from '@Model/timeTableFestival.model';

const getFSTimeTable = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const timetable: TimeTableFestival[] = await TimeTableFestival.findAll({
      order: [['time', 'ASC']],
    });

    if (timetable.length) {
      res.json({
        success: true,
        data: {
          timetable,
        },
      });
    } else {
      next(new CustomError({ name: 'Not_Found' }));
    }
  } catch (err) {
    console.log(err);
    next(new CustomError({ name: 'Database_Error' }));
  }
};

export default getFSTimeTable;
