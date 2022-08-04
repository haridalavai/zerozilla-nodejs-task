import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { app } from './app';

const start = () => {
  dotenv.config({ path: path.resolve(__dirname, './config/.env') });
  console.log('starting up the server');

  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY muust be defined');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }

  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log('connected to mongo');
  } catch (error) {
    console.log(error);
  }

  app.listen(process.env.PORT || 3000, () => {
    console.log('listening on port 3000');
  });
};

start();
