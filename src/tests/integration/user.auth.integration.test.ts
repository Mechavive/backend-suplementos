// src/tests/integration/user.auth.integration.test.ts
import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import UserRouter from '../../routes/user.routes';
import AuthRouter from '../../routes/auth.routes';
import MockUser from '../../models/implementations/mock/mockUser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import app from '../../app';

jest.mock('bcrypt', () => ({
  hash: jest.fn(async (pass: string) => `hashed-${pass}`),
  compare: jest.fn(async (pass: string, hash: string) => hash === `hashed-${pass}`),
}));

describe('User + Auth Integration', () => {
  beforeEach(() => {
    MockUser.clear();
  });

  it('should create a user and login successfully', async () => {
    //  Crear usuario
    const newUser = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'mypassword',
      address: '123 Test St',
    };

    const createRes = await request(app).post('/api/users').send(newUser).expect(201);

    expect(createRes.body).toHaveProperty('user_id');
    expect(createRes.body.email).toBe(newUser.email);

    //  Login
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ email: newUser.email, password: newUser.password })
      .expect(200);

    expect(loginRes.body).toHaveProperty('token');
    expect(loginRes.body.user.email).toBe(newUser.email);

    //  Verificar JWT
    const decoded: any = jwt.verify(
      loginRes.body.token,
      process.env.JWT_SECRET ?? 'super_secret_key',
    );
    expect(decoded).toHaveProperty('user_id', createRes.body.user_id);
    expect(decoded).toHaveProperty('role');
  });

  it('should fail login with wrong password', async () => {
    // Crear usuario
    const user = await MockUser.create({
      name: 'Fail User',
      email: 'fail@example.com',
      password: 'hashed-pass', // bcrypt está mockeado
      address: 'Nowhere',
    });

    // Intento de login con contraseña incorrecta
    await request(app)
      .post('/api/auth/login')
      .send({ email: user.email, password: 'wrongpass' })
      .expect(401);
  });
});
