import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

import Errors from './errors';

interface IDefinedError {
  description: string;
  name: string;
  code: number;
  message: string;
}

const ErrorMiddleware: ErrorRequestHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.name, err.message);

  const error: IDefinedError = Errors[err.name];
  const name: string = err.name;
  const description: string = error.description;
  const message: string = err.message || error.message;
  const code: number = error.code;

  res.status(code).json({
    success: false,
    code,
    name,
    message,
    description,
  });
};

export default ErrorMiddleware;
