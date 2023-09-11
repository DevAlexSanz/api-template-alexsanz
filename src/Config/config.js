import dotenv from 'dotenv';

dotenv.config();

export const enviromentConfig = {
  port: process.env.PORT || 9000,
  url: process.env.URL || 'http://localhost:',
  database: {
    uri: process.env.MONGODB_URI,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
};
