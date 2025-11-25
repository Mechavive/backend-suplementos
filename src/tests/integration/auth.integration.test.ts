// src/test/integration/auth.integration.test.ts
import request from 'supertest';
import app from '../../app';
import jwt from 'jsonwebtoken';
import { UserRole } from '../../../src/models/entity/user.entity';

describe('Auth Integration', () => {
  describe('POST /api/auth/login', () => {
    it('debería autenticar correctamente y devolver un token', async () => {
      const response = await request(app).post('/api/auth/login').send({
        name: 'admin',
        password: 'admin123', // mínimo 6 caracteres
      });

      expect(response.status).toBe(200);

      expect(response.body).toHaveProperty('token');

      expect(response.body.user).toMatchObject({
        name: 'admin',
        role: UserRole.ADMIN,
      });

      // Verificar que exista el email (el backend lo devuelve)
      expect(response.body.user).toHaveProperty('email');

      // Verificar JWT
      const decoded = jwt.decode(response.body.token);
      expect(decoded).toHaveProperty('user_id');
      expect(decoded).toHaveProperty('role', 'ADMIN');
    });

    it('debería fallar si las credenciales son inválidas', async () => {
      const response = await request(app).post('/api/auth/login').send({
        name: 'admin',
        password: 'wrongpass',
      });

      expect(response.status).toBe(401);
      expect(response.body.message).toMatch(/credenciales/i);
    });
  });
});
