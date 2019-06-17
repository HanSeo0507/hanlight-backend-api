import { NextFunction, Request, Response } from 'express';
import { Op } from 'sequelize';

import deleteUndefined from '@Lib/deleteUndefined';
import CustomError from '@Middleware/error/customError';
import Notice from '@Model/notice.model';
import NoticeViewLog from '@Model/noticeViewLog.model';

const getNotice = async (req: Request, res: Response, next: NextFunction) => {
  const limit = 10;
  const seachType: 'list' | 'post' = req.query.type;
  const searchPage = (req.query.page && req.query.page - 1) || 0;
  const searchPk = req.query.post_pk;
  const searchTitle = req.query.title;

  try {
    let notice: Notice | Notice[];
    if (seachType === 'post') {
      notice = await Notice.findOne({
        where: {
          pk: searchPk,
          approved: true,
        },
        attributes: ['pk', 'title', 'content', 'createdAt'],
      });
    } else {
      const listWhereClause = {
        title: (searchTitle && { [Op.like]: `%${searchTitle}%` }) || undefined,
        approved: true,
      };
      deleteUndefined(listWhereClause);

      notice = await Notice.findAll({
        where: listWhereClause,
        offset: searchPage * limit,
        limit,
        attributes: ['pk', 'title', 'createdAt'],
        order: [['createdAt', 'DESC']],
      });
    }

    if (Array.isArray(notice)) {
      const noticePks = notice.map(val => val.pk);
      const logs = await NoticeViewLog.findAll({
        where: {
          user_pk: res.locals.user.pk,
          notice_pk: noticePks,
        },
      });
      res.locals.notice = await notice.map(val => {
        const EditedNotice = {
          pk: val.pk,
          title: val.title,
          createdAt: val.createdAt,
          read: false,
        };
        for (const log of logs) {
          if (val.pk === log.notice_pk) {
            EditedNotice.read = true;
          }
        }
        return EditedNotice;
      });
    } else {
      res.locals.notice = notice;
    }
    await next();
  } catch (error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
};

export default getNotice;
