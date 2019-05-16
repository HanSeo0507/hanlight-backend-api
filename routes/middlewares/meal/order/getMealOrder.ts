import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';

import MealOrder from '@Model/mealOrder.model';

const mealOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result: MealOrder[] = await MealOrder.findAll();
    const order = result[0].order;

    await res.json({
      success: true,
      data: {
        order: order || '조회된 데이터가 없습니다.',
      },
    });
  } catch (error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
};

export default mealOrder;
