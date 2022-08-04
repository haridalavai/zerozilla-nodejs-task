import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { BadRequestError } from '../../errors';
import { User } from '../../models/user';
import jwt from 'jsonwebtoken';

const getApiKey = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;

  if (!mongoose.isValidObjectId(userId)) {
    throw new BadRequestError('Invalid user id');
  }
  const user = await User.findById(userId);

  if (!user) {
    throw new BadRequestError('User not found');
  }

  const token = jwt.sign({ userId }, process.env.JWT_KEY!);
  return token;
};

export { getApiKey };
