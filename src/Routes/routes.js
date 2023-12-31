import { Router } from 'express';
import { environmentConfig } from '../Config/config.js';
import v1Routes from '../App/v1/v1Routes.js';

const router = Router();
const { port, url } = environmentConfig;

router.use('/v1', v1Routes);

router.get('/', (request, response) => {
  response.status(200).json({
    message: 'Select a version of the API',
    v1: `${url}${port}/api/v1`,
    v2: 'Coming Soon...',
  });
});

export default router;
