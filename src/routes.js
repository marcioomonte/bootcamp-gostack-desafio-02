import { Router } from 'express';
import UserController from './app/controllers/UserController';

const routes = new Router();

routes.get('/users', UserController.index); // Listar todos
routes.post('/users', UserController.store); // Criar
routes.get('/users/:id', UserController.show); // Buscar
routes.put('/users/:id', UserController.update); // Editar
routes.delete('/users/:id', UserController.delete); // Deletar

export default routes;
