import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';

import Calendar from '@Model/calendar.model';
import CalendarLog from '@Model/calendarLog.model';
import User from '@Model/user.model';

const postCalendar = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;
  const month: Calendar['month'] = parseInt(req.body.month, 10);
  const date: Calendar['date'] = parseInt(req.body.date, 10);
  const detail: Calendar['detail'] = req.body.detail;

  try {
    const [calendar]: [Calendar, unknown] = await Promise.all([
      Calendar.create({
        month,
        date,
        detail,
      }),
      CalendarLog.create({
        user_pk: user.pk,
        type: 'C',
        month,
        date,
        detail,
      }),
    ]);

    res.json({
      success: true,
      data: {
        calendar,
      },
    });
  } catch (error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
};

export default postCalendar;
