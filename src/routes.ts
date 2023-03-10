import { Router } from 'express';
import { UsersController } from './users-controller';
const route = Router();
const usersController = new UsersController();

route.get('/', (_req, res) => {
  return res.json({ hello: 'world' });
});

route.get('/users', usersController.getUsers);
route.post('/user', usersController.createUser);
route.get('/users/:userId', usersController.getUserById);
route.put('/users/:userId', usersController.updateUser);
route.delete('/users/:userId', usersController.deleteUser);

export { route };
