import { Request, Response } from 'express';

const getStatus = (req: Request, res: Response) => {
  res.status(200).send('success');
};

export default getStatus;
