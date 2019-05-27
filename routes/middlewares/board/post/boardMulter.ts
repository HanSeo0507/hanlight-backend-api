import { NextFunction, Request, Response } from 'express';
import * as Multer from 'multer';

import CustomError from '@Middleware/error/customError';

const postMulter = (req: Request, res: Response, next: NextFunction) => {
  multer(req, res, err => {
    if (err) {
      next(new CustomError({ name: 'Wrong_Data', message: err.message }));
    } else {
      next();
    }
  });
};

const multer = Multer({
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
      cb(null, true);
    } else {
      cb(new Error('Wrong mimetype'), false);
    }
  },
  limits: {
    fileSize: 1048576,
  },
}).array('files', 5);

export default postMulter;
