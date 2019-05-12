import { NextFunction, Request, Response } from 'express';

import MealOrder from '@Model/mealOrder.model';

const mealOrder = async (req: Request, res: Response, next: NextFunction) => {
  const result: MealOrder[] = await MealOrder.findAll();

  await res.json({
    success: true,
    data: {
      order: result[0].order,
    },
  });
};

export default mealOrder;
