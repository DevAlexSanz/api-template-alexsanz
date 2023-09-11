import express from 'express';
// The cors module allows you to configure the server
// to accept requests from other domains
import cors from 'cors';
// The morgan module allows you to view the requests
// that arrive at the server to know their status
import morgan from 'morgan';
import { initializeDB } from '../Database/database.js';
import { enviromentConfig } from '../Config/config.js';

const app = express();
const { port, url } = enviromentConfig;

const initializeServer = async (apiRoutes) => {
  try {
    // Initialize DB
    await initializeDB();

    // Set port
    app.set(port);

    // Middlewares
    app.use(express.json());
    app.use(cors());
    app.use(morgan('dev'));

    // App listen
    await app.listen(port, () => {
      console.log(
        '===========================================================\n' +
        `                Server listening and running\n` +
        '===========================================================\n' +
        `Access the server at: ${url}${port}`
      );
    });

    // Routes
    app.use('/api', apiRoutes);

    app.get('/', (request, response) => {
      return response.status(200).json({
        message: 'Welcome to the API',
        api: `${url}${port}/api`,
      });
    });
  } catch (err) {
    console.log(
      '===========================================================\n' +
      `                Could not start the server\n` +
      '===========================================================\n' +
      `Error: ${err.message}`
    );
  }
};

export default initializeServer;