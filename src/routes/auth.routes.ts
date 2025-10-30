// src/routes/auth.routes.ts
import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import { validate } from '../middlewares/validate.middleware';
import { loginSchema } from '../schemas/auth.schema';

const router = Router();

// POST /api/auth/login — iniciar sesión
router.post('/login', validate(loginSchema, 'body'), AuthController.login);

export default router;
