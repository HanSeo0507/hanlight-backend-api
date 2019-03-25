import { NextFunction, Request, Response, Router } from 'express';

import CustomError from '@Middleware/error/customError';
import * as swaggerUiExpress from 'swagger-ui-express';

import Errors from '@Middleware/error/errors';

import * as swaggerJson from '../../swagger.json';

const router = Router();

router.use((req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV !== 'development') {
    console.log(process.env.NODE_ENV);
    next(new CustomError({ name: 'Not_Found' }));
  } else {
    next();
  }
});

router.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerJson));

router.use('/errors', (req: Request, res: Response, next: NextFunction) => {
  res.json(Errors);
});

export default router;
