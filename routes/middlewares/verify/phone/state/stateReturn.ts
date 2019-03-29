import { NextFunction, Request, Response } from 'express';

const stateReturn = (req: Request, res: Response, next: NextFunction) => {
  res.json({
    success: true,
    data: {
      state: res.locals.user.pk,
    },
  });
};

export default stateReturn;
