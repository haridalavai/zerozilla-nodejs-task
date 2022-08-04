import { Request, Response, NextFunction } from 'express';
import { NotAuthorisedError } from '../errors';

export const authenticator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header('Authorization');

  if (!token) {
    throw new NotAuthorisedError();
  }

  next();
};
