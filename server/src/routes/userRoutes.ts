import { Router } from 'express';
import * as UserController from '../controllers/userController';

const router = Router();

router.post('/signup', UserController.signUp);

router.post('/login', UserController.login);

router.get('/', UserController.getAuthenticatedUser);

router.post('/logout', UserController.logout);

router.get('/:id', UserController.getUserById);

router.patch('/:id', UserController.updateUser);

router.get('/all', UserController.getAllUsers);

export default router;