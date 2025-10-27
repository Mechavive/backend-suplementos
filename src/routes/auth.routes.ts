// src/routes/auth.routes.ts
import { Router } from 'express';
import AuthController from '../controllers/auth.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { loginSchema } from '../schemas/auth.schema.js';

const router = Router();

// POST /api/auth/login — iniciar sesión
router.post('/login', validate(loginSchema, 'body'), AuthController.login);

export default router;
