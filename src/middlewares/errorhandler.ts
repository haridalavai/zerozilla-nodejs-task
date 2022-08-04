import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom-error';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    const serializedError = err.serializeErrors();
    res.status(err.statusCode).json({ errors: serializedError });
  } else {
    console.error(err);
    res.status(500).json({ errors: [{ message: 'Something went wrong' }] });
  }
};
