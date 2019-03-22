import CustomError from '@Middleware/Error/customError';
import { NextFunction, Request, Response, Router } from 'express';

const router = Router();

router.use((req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV !== 'development') {
    next(new CustomError({ name: 'Not_Found' }));
  } else {
    // 임시
    next();
  }
});

export default router;
