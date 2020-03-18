import { NextFunction, Request, Response } from 'express';

import User from '@Model/user.model';

const patchPassword = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;
  const password: User['password'] = res.locals.temp.password;
  const passwordKey: User['passwordKey'] = res.locals.temp.passwordKey;

  await user.update({
    password,
    passwordKey,
  });

  res.json({
    success: true,
  });
};

export default patchPassword;
