import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

routes.get('/users', UserController.index); // Listar todos
routes.post('/users', UserController.store); // Criar
routes.get('/users/:id', UserController.show); // Buscar
routes.put('/users/:id', UserController.update); // Editar
routes.delete('/users/:id', UserController.delete); // Deletar

routes.post('/sessions', SessionController.store);

export default routes;
