import { Router } from 'express';
import { enviromentConfig } from '../../Config/config.js';
import userRoutes from './Users/user.routes.example.js';

const router = Router();

const { port, url } = enviromentConfig;

router.use('/users', userRoutes);

router.get('/', (request, response) => {
  return response.status(200).json({
    users: `${url}${port}/api/v1/users (CRUD and more)`,
  });
});

export default router;
