import dotenv from 'dotenv';

dotenv.config();

export const environmentConfig = {
  port: process.env.PORT || 9000,
  url: process.env.URL || 'http://localhost:',
  corsOptions: {
    origin: function (origin, callback) {
      const originsWhitelist = process.env.ORIGINS_WHITELIST.split(',');

      if (originsWhitelist.includes(origin) || !origin) {
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
