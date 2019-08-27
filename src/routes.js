import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import auth from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);
routes.get('/users', UserController.index); // Listar todos
routes.post('/users', UserController.store); // Criar
routes.get('/users/:id', UserController.show); // Buscar
routes.delete('/users/:id', UserController.delete); // Deletar

routes.use(auth);
routes.put('/users', UserController.update); // Editar

export default routes;
