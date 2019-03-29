import { NextFunction, Request, Response, response } from 'express';

import CustomError from '@Middleware/error/customError';

const stateCheck = (req: Request, res: Response, next: NextFunction) => {
  const requestState: string = req.body.state;
  const settingState = res.locals.user.pk;

  if (requestState === settingState) {
    next();
  } else {
    next(new CustomError({ name: 'Wrong_Data' }));
  }
};

export default stateCheck;
