import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';
import Notice from '@Model/notice.model';
import NoticeLog from '@Model/noticeLog.model';

const createNoticeLog = async (req: Request, res: Response, next: NextFunction) => {
  const notice: Notice | Notice[] = res.locals.notice;
  const searchType: 'list' | 'post' = req.query.type;
  const user_pk = res.locals.user.pk;

  try {
    if (searchType === 'post' && !notice) {
      next(new CustomError({ name: 'Not_Found' }));
    } else {
      if (!Array.isArray(notice)) {
        await NoticeLog.findOrCreate({
          where: {
            notice_pk: notice.pk,
            user_pk,
          },
          defaults: {
            notice_pk: notice.pk,
            user_pk,
          },
        });
      }
      await res.json({
        success: true,
        data: {
          notice,
        },
      });
    }
  } catch (error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
};

export default createNoticeLog;
