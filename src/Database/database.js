import mongoose from 'mongoose';
import { enviromentConfig } from '../Config/config.js';

export const initializeDB = async () => {
  try {
    const { database } = enviromentConfig;
    const { uri, options } = database;

    await mongoose.connect(uri, options);

    console.log(
      '===========================================================\n' +
      '               MongoDB Connection Succesfully'
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
