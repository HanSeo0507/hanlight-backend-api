import { NextFunction, Request, Response } from 'express';
import { Op } from 'sequelize';

import Meal from '@Model/meal.model';

const getMeal = async (req: Request, res: Response, next: NextFunction) => {
  const sort: 'month' | 'week' = req.query.sort;

  const date = new Date();

  const whereClause = {
    month: date.getMonth() + 1,
    date:
      sort === 'week'
        ? {
            [Op.and]: {
              [Op.gte]: date.getDate(),
              [Op.lt]: date.getDate() + 7,
            },
          }
        : {
            [Op.ne]: null,
          },
  };

  const result: Meal[] = await Meal.findAll({
    where: whereClause,
    order: ['date'],
    attributes: ['date', 'detail'],
  });

  await res.json({
    success: true,
    data: {
      meal: result,
    },
  });
};

export default getMeal;
