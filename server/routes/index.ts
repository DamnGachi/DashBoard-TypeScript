import express, { Router } from 'express';
import RegistryController from '../src/controllers/auth/user';
import AuthController from '../src/controllers/auth/googleAuth';

const router: Router = express();

router.get('/logged_in', AuthController.login);

router.post('/api/register', RegistryController.createUser);

export default router;
