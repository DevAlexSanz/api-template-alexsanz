import { Router } from 'express';
import { environmentConfig } from '../../Config/config.js';
import userRoutes from './Users/user.routes.example.js';

const router = Router();

const { port, url } = environmentConfig;

router.use('/users', userRoutes);

router.get('/', (request, response) => {
  return response.status(200).json({
    users: `${url}${port}/api/v1/users (CRUD and more)`,
  });
});

export default router;
