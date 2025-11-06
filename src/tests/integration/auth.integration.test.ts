import request from 'supertest';
import app from '../../app';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRole } from '../../../src/models/entity/user.entity';

describe('Auth Integration', () => {
  describe('POST /api/auth/login', () => {
    it('debería autenticar correctamente y devolver un token', async () => {
      const response = await request(app).post('/api/auth/login').send({
        email: 'admin@admin.com',
        password: 'admin123', // mínimo 6 caracteres
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
      expect(response.body.user).toMatchObject({
        email: 'admin@admin.com',
        role: UserRole.ADMIN,
      });

      // Verificar formato del JWT
      const decoded = jwt.decode(response.body.token);
      expect(decoded).toHaveProperty('user_id');
      expect(decoded).toHaveProperty('role', 'ADMIN');
    });

    it('debería fallar si las credenciales son inválidas', async () => {
      const response = await request(app).post('/api/auth/login').send({
        email: 'admin@admin.com',
        password: 'wrongpassword',
      });

      expect(response.status).toBe(401);
      expect(response.body.message).toMatch(/credenciales/i);
    });
  });
});
