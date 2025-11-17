// src/test/integration/user.integration.test.ts
/* import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../../app';
import MockUser from '../../models/implementations/mock/mockUser';
import { UserRole } from '../../models/entity/user.entity';

let adminToken: string;
let normalToken: string;

beforeAll(() => {
  if (!process.env.JWT_SECRET) process.env.JWT_SECRET = 'testsecret';
});

beforeEach(async () => {
  MockUser.clear();

  const adminUser = await MockUser.create({
    name: 'Admin',
    email: 'admin@example.com',
    password: 'adminpass',
    address: 'Admin Address',
    role: UserRole.ADMIN,
  });

  const normalUser = await MockUser.create({
    name: 'User',
    email: 'user@example.com',
    password: 'userpass',
    address: 'Normal Address',
    role: UserRole.USER,
  });

  adminToken = jwt.sign(
    { user_id: adminUser.user_id, role: adminUser.role },
    process.env.JWT_SECRET as string,
    { expiresIn: '1h' },
  );
  normalToken = jwt.sign(
    { user_id: normalUser.user_id, role: normalUser.role },
    process.env.JWT_SECRET as string,
    { expiresIn: '1h' },
  );
});

describe('User Integration', () => {
  // Get all users
  describe('Get all users (admin only)', () => {
    it('should return 403 for non-admin', async () => {
      const res = await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${normalToken}`);
      expect(res.status).toBe(403);
    });

    it('should return 200 for admin', async () => {
      const res = await request(app).get('/api/users').set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  // Get user by id
  describe('Get user by id', () => {
    it('should return 403 for non-admin', async () => {
      const user = await MockUser.create({
        name: 'User2',
        email: 'user2@example.com',
        password: 'pass2',
        address: 'Address 2',
        role: UserRole.USER,
      });
      const res = await request(app)
        .get(`/api/users/${user.user_id}`)
        .set('Authorization', `Bearer ${normalToken}`);
      expect(res.status).toBe(403);
    });

    it('should return 200 for admin', async () => {
      const user = await MockUser.create({
        name: 'User2',
        email: 'user2@example.com',
        password: 'pass2',
        address: 'Address 2',
        role: UserRole.USER,
      });
      const res = await request(app)
        .get(`/api/users/${user.user_id}`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).toBe(200);
      expect(res.body.user_id).toBe(user.user_id);
    });
  });

  // Create user
  describe('Create user', () => {
    it('should not allow duplicate emails', async () => {
      const user = {
        name: 'User1',
        email: 'duplicate@example.com',
        password: 'pass1',
        address: 'Address 1',
      };
      await MockUser.create(user);

      const res = await request(app).post('/api/users').send(user);
      expect(res.status).toBe(422);
      expect(res.body.errors || res.body.error).toBeDefined();
    });
  });

  // Update user
  describe('Update user', () => {
    it('should return 403 for non-admin', async () => {
      const user = await MockUser.create({
        name: 'User3',
        email: 'user3@example.com',
        password: 'pass3',
        address: 'Address 3',
        role: UserRole.USER,
      });
      const res = await request(app)
        .put(`/api/users/${user.user_id}`)
        .set('Authorization', `Bearer ${normalToken}`)
        .send({ name: 'Updated Name' });
      expect(res.status).toBe(403);
    });

    it('should update user for admin', async () => {
      const user = await MockUser.create({
        name: 'User3',
        email: 'user3@example.com',
        password: 'pass3',
        address: 'Address 3',
        role: UserRole.USER,
      });
      const res = await request(app)
        .put(`/api/users/${user.user_id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: 'Updated Name' });
      expect(res.status).toBe(200);
      expect(res.body.name).toBe('Updated Name');
    });
  });

  // Delete user
  describe('Delete user', () => {
    it('should return 403 for non-admin', async () => {
      const user = await MockUser.create({
        name: 'User4',
        email: 'user4@example.com',
        password: 'pass4',
        address: 'Address 4',
        role: UserRole.USER,
      });
      const res = await request(app)
        .delete(`/api/users/${user.user_id}`)
        .set('Authorization', `Bearer ${normalToken}`);
      expect(res.status).toBe(403);
    });

    it('should delete user for admin', async () => {
      const user = await MockUser.create({
        name: 'User4',
        email: 'user4@example.com',
        password: 'pass4',
        address: 'Address 4',
        role: UserRole.USER,
      });
      const res = await request(app)
        .delete(`/api/users/${user.user_id}`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).toBe(200);
    });

    it('should return 404 for non-existent user', async () => {
      const fakeId = 99999; // número que no existe en la DB
      const res = await request(app)
        .delete(`/api/users/${fakeId}`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).toBe(404);
    });
  });
}); */

// src/tests/integration/user.integration.test.ts
import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../../app';
import MockUser from '../../models/implementations/mock/mockUser';
import { UserRole } from '../../models/entity/user.entity';

let adminToken: string;
let normalToken: string;

beforeAll(() => {
  if (!process.env.JWT_SECRET) process.env.JWT_SECRET = 'testsecret';
});

beforeEach(async () => {
  MockUser.clear();

  const adminUser = await MockUser.create({
    name: 'Admin',
    email: 'admin@example.com',
    password: 'adminpass',
    address: 'Admin Address',
    role: UserRole.ADMIN,
  });

  const normalUser = await MockUser.create({
    name: 'User',
    email: 'user@example.com',
    password: 'userpass',
    address: 'Normal Address',
    role: UserRole.USER,
  });

  adminToken = jwt.sign(
    { user_id: adminUser.user_id, role: adminUser.role },
    process.env.JWT_SECRET as string,
    { expiresIn: '1h' },
  );

  normalToken = jwt.sign(
    { user_id: normalUser.user_id, role: normalUser.role },
    process.env.JWT_SECRET as string,
    { expiresIn: '1h' },
  );
});

describe('Pruebas de integración de usuarios', () => {
  // ------------------- GET /users -------------------
  describe('Obtener todos los usuarios (solo admin)', () => {
    it('debería retornar 403 para usuarios no admin', async () => {
      const res = await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${normalToken}`);
      expect(res.status).toBe(403);
    });

    it('debería retornar 401 si no hay token', async () => {
      const res = await request(app).get('/api/users');
      expect(res.status).toBe(401);
    });

    it('debería retornar 200 para admin', async () => {
      const res = await request(app).get('/api/users').set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  // ------------------- GET /users/:id -------------------
  describe('Obtener usuario por ID', () => {
    it('debería retornar 403 para usuarios no admin', async () => {
      const user = await MockUser.create({
        name: 'User2',
        email: 'user2@example.com',
        password: 'pass2',
        address: 'Address 2',
        role: UserRole.USER,
      });

      const res = await request(app)
        .get(`/api/users/${user.user_id}`)
        .set('Authorization', `Bearer ${normalToken}`);

      expect(res.status).toBe(403);
    });

    it('debería retornar 200 para admin', async () => {
      const user = await MockUser.create({
        name: 'User2',
        email: 'user2@example.com',
        password: 'pass2',
        address: 'Address 2',
        role: UserRole.USER,
      });

      const res = await request(app)
        .get(`/api/users/${user.user_id}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.user_id).toBe(user.user_id);
    });

    it('debería retornar 404 si el usuario no existe', async () => {
      const res = await request(app)
        .get('/api/users/99999')
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).toBe(404);
    });
  });

  // ------------------- POST /users -------------------
  describe('Crear usuario', () => {
    it('debería crear un usuario correctamente', async () => {
      const res = await request(app).post('/api/users').send({
        name: 'NuevoUsuario',
        email: 'nuevousuario@example.com',
        password: 'password123',
        address: 'Dirección 1',
      });

      expect(res.status).toBe(201);
      expect(res.body.user_id).toBeDefined();
      expect(res.body.email).toBe('nuevousuario@example.com');
    });

    it('no debería permitir emails duplicados', async () => {
      await MockUser.create({
        name: 'Usuario1',
        email: 'duplicado@example.com',
        password: 'pass1',
        address: 'Dirección 1',
        role: UserRole.USER,
      });

      const res = await request(app).post('/api/users').send({
        name: 'Usuario1',
        email: 'duplicado@example.com',
        password: 'pass1',
        address: 'Dirección 1',
      });

      expect(res.status).toBe(422);
      expect(res.body.errors || res.body.error).toBeDefined();
    });

    it('debería retornar 422 si los datos son inválidos', async () => {
      const res = await request(app).post('/api/users').send({
        name: '',
        email: 'correo_invalido',
        password: '123',
        address: '',
      });
      expect(res.status).toBe(422);
    });
  });

  // ------------------- PUT /users/:id -------------------
  describe('Actualizar usuario', () => {
    it('debería retornar 403 para usuarios no admin', async () => {
      const user = await MockUser.create({
        name: 'Usuario3',
        email: 'usuario3@example.com',
        password: 'pass3',
        address: 'Dirección 3',
        role: UserRole.USER,
      });

      const res = await request(app)
        .put(`/api/users/${user.user_id}`)
        .set('Authorization', `Bearer ${normalToken}`)
        .send({ name: 'Nombre Actualizado' });

      expect(res.status).toBe(403);
    });

    it('debería actualizar el usuario si es admin', async () => {
      const user = await MockUser.create({
        name: 'Usuario3',
        email: 'usuario3@example.com',
        password: 'pass3',
        address: 'Dirección 3',
        role: UserRole.USER,
      });

      const res = await request(app)
        .put(`/api/users/${user.user_id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: 'Nombre Actualizado' });

      expect(res.status).toBe(200);
      expect(res.body.name).toBe('Nombre Actualizado');
    });

    it('debería retornar 404 si el usuario no existe', async () => {
      const res = await request(app)
        .put('/api/users/99999')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: 'SinUsuario' });

      expect(res.status).toBe(404);
    });

    it('debería retornar 422 si los datos son inválidos', async () => {
      const user = await MockUser.create({
        name: 'Usuario4',
        email: 'usuario4@example.com',
        password: 'pass4',
        address: 'Dirección 4',
        role: UserRole.USER,
      });

      const res = await request(app)
        .put(`/api/users/${user.user_id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ email: 'correo_no_valido' });

      expect(res.status).toBe(422);
    });
  });

  // ------------------- DELETE /users/:id -------------------
  describe('Eliminar usuario', () => {
    it('debería retornar 403 para usuarios no admin', async () => {
      const user = await MockUser.create({
        name: 'Usuario5',
        email: 'usuario5@example.com',
        password: 'pass5',
        address: 'Dirección 5',
        role: UserRole.USER,
      });

      const res = await request(app)
        .delete(`/api/users/${user.user_id}`)
        .set('Authorization', `Bearer ${normalToken}`);

      expect(res.status).toBe(403);
    });

    it('debería eliminar usuario si es admin', async () => {
      const user = await MockUser.create({
        name: 'Usuario5',
        email: 'usuario5@example.com',
        password: 'pass5',
        address: 'Dirección 5',
        role: UserRole.USER,
      });

      const res = await request(app)
        .delete(`/api/users/${user.user_id}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
    });

    it('debería retornar 404 si el usuario no existe', async () => {
      const res = await request(app)
        .delete('/api/users/99999')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(404);
    });
  });
});
