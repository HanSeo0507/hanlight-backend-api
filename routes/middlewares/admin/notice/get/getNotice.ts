import { NextFunction, Request, Response } from 'express';

import Notice from '@Model/notice.model';
import NoticeApproveLog from '@Model/noticeApproveLog.model';

const getNotice = async (req: Request, res: Response, next: NextFunction) => {
  const notice: Notice[] = await Notice.findAll({
    include: [
      {
        model: NoticeApproveLog,
        limit: 3,
        order: [['createdAt', 'DESC']],
      },
    ],
  });

  res.json({
    success: true,
    data: {
      notice,
    },
  });
};

export default getNotice;
