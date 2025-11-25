// src/tests/integration/auth.integration.mock.test.ts
import request from 'supertest';
import app from '../../app';
import UserService from '../../services/user.service';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, UserRole } from '../../models/entity/user.entity';

// Mock de bcrypt
jest.mock('bcrypt', () => ({
  hash: jest.fn(async (pass: string) => `hashed-${pass}`),
  compare: jest.fn(async (pass: string, hash: string) => hash === `hashed-${pass}`),
}));

describe('Integración - AUTH (mocked)', () => {
  const API_KEY = process.env.API_KEY ?? 'test_api_key';

  let testUser: User;

  beforeAll(async () => {
    // Crear usuario simulado
    testUser = new User(
      1,
      'TestUser',
      'testuser@example.com',
      await bcrypt.hash('password123', 10),
      'Calle Falsa 123',
      UserRole.USER,
    );

    // Mockear UserService.getByName para login
    jest.spyOn(UserService, 'getByName').mockImplementation(async (name: string) => {
      return name === testUser.name ? testUser : undefined;
    });

    // Mockear UserService.getByEmail para forgot-password
    jest.spyOn(UserService, 'getByEmail').mockImplementation(async (email: string) => {
      return email === testUser.email ? testUser : undefined;
    });

    // Mockear UserService.create por si algún test crea usuarios
    jest.spyOn(UserService, 'create').mockImplementation(async (userData: any) => {
      return new User(
        2,
        userData.name,
        userData.email,
        userData.password,
        userData.address,
        UserRole.USER,
      );
    });
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  // ------------------- LOGIN -------------------
  describe('POST /api/auth/login', () => {
    it('debería iniciar sesión con credenciales válidas y devolver un token', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .set('x-api-key', API_KEY)
        .send({ name: 'TestUser', password: 'password123' });

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Login exitoso');
      expect(res.body.token).toBeDefined();
      expect(res.body.user.name).toBe(testUser.name);

      // Verificar JWT
      const decoded: any = jwt.verify(res.body.token, process.env.JWT_SECRET ?? 'super_secret_key');
      expect(decoded).toHaveProperty('user_id', testUser.user_id);
      expect(decoded).toHaveProperty('role', testUser.role);
    });

    it('debería retornar 401 si la contraseña es incorrecta', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .set('x-api-key', API_KEY)
        .send({ name: 'TestUser', password: 'wrongpass' });

      expect(res.status).toBe(401);
      expect(res.body.message).toBe('Credenciales inválidas');
    });

    it('debería retornar 401 si el usuario no existe', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .set('x-api-key', API_KEY)
        .send({ name: 'NoExiste', password: 'password123' });

      expect(res.status).toBe(401);
      expect(res.body.message).toBe('Credenciales inválidas');
    });

    it('debería retornar 422 si faltan campos o no cumplen el schema', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .set('x-api-key', API_KEY)
        .send({ name: 'Te' }); // contraseña faltante

      expect(res.status).toBe(422);
      expect(res.body.errors).toBeDefined();
    });
  });

  // ------------------- FORGOT PASSWORD -------------------
  describe('POST /api/auth/forgot-password', () => {
    it('debería enviar un "correo" si el email existe', async () => {
      const res = await request(app)
        .post('/api/auth/forgot-password')
        .set('x-api-key', API_KEY)
        .send({ email: 'testuser@example.com' });

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Se enviaron instrucciones a su correo electrónico');
    });

    it('debería retornar 404 si el email no pertenece a ningún usuario', async () => {
      const res = await request(app)
        .post('/api/auth/forgot-password')
        .set('x-api-key', API_KEY)
        .send({ email: 'noexiste@example.com' });

      expect(res.status).toBe(404);
      expect(res.body.message).toBe('No existe un usuario con ese email');
    });

    it('debería retornar 422 si el email es inválido', async () => {
      const res = await request(app)
        .post('/api/auth/forgot-password')
        .set('x-api-key', API_KEY)
        .send({ email: 'correo-invalido' });

      expect(res.status).toBe(422);
      expect(res.body.errors).toBeDefined();
    });
  });
});
