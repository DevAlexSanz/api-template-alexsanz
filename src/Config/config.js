import dotenv from 'dotenv';

dotenv.config();

export const enviromentConfig = {
  port: process.env.PORT || 9000,
  url: process.env.URL || 'http://localhost:',
  corsOptions: {
    origin: function (origin, callback) {
      const allowedOrigins = process.env.CORS_ORIGIN.split(',');

      if (allowedOrigins.includes(origin) || !origin) {
        return callback(null, true);
      }

      return callback('Not allowed by CORS');
    },
  },
  database: {
    uri: process.env.MONGODB_URI,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
};
