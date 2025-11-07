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
});
