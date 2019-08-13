import { NextFunction, Request, Response } from 'express';

import Recruit from '@Model/recruit.model';

const postRecruit = (req: Request, res: Response, next: NextFunction) => {
  res.json({ success: true });
};

export default postRecruit;
