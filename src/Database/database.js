import mongoose from 'mongoose';
import { environmentConfig } from '../Config/config.js';

export const initializeDB = async () => {
  try {
    const { database } = environmentConfig;
    const { uri, options } = database;

    await mongoose.connect(uri, options);

    console.log(
      '===========================================================\n' +
      '               MongoDB Connection Successfully'
    );

    return mongoose;
  } catch (err) {
    console.log(
      '===========================================================\n' +
      '                 MongoDB Connection Failed\n' +
      '===========================================================\n' +
      `Error: ${err.message}`
    );
    return null;
  }
};
