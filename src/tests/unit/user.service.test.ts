// tests/user.service.test.ts
import userService from '../../services/user.service';
import mockUser from '../../models/implementations/mock/mockUser';
import bcrypt from 'bcrypt';

describe('UserService - Unit Tests', () => {
  beforeEach(() => {
    mockUser.clear();
  });

  it('should create a new user with hashed password', async () => {
    const newUser = await userService.create({
      name: 'Test User',
      email: 'test@example.com',
      password: 'Password123',
      address: 'Test Street 1',
    });

    expect(newUser.user_id).toBeDefined();
    expect(newUser.name).toBe('Test User');

    const isMatch = await bcrypt.compare('Password123', newUser.password);
    expect(isMatch).toBe(true);

    // validar todo el objeto plano
    expect(newUser.toJSON()).toEqual({
      user_id: expect.any(Number),
      name: 'Test User',
      email: 'test@example.com',
      password: expect.any(String),
      address: 'Test Street 1',
      role: 'USER',
    });
  });

  it('should not allow duplicate emails', async () => {
    await userService.create({
      name: 'User1',
      email: 'dup@example.com',
      password: '123',
      address: 'Street',
    });

    await expect(
      userService.create({
        name: 'User2',
        email: 'dup@example.com',
        password: '123',
        address: 'Street',
      }),
    ).rejects.toThrow('El email ya está registrado');
  });

  it('should get a user by ID', async () => {
    const created = await userService.create({
      name: 'User3',
      email: 'user3@example.com',
      password: '123',
      address: 'Street',
    });

    const fetched = await userService.getById(created.user_id);
    expect(fetched).not.toBeUndefined();
    expect(fetched!.email).toBe('user3@example.com');
  });

  it('should update a user password', async () => {
    const created = await userService.create({
      name: 'User4',
      email: 'user4@example.com',
      password: 'oldpass',
      address: 'Street',
    });

    const updated = await userService.update(created.user_id, { password: 'newpass' });
    expect(updated).not.toBeUndefined();
    const isMatch = await bcrypt.compare('newpass', updated!.password);
    expect(isMatch).toBe(true);
  });

  it('should delete a user', async () => {
    const created = await userService.create({
      name: 'User5',
      email: 'user5@example.com',
      password: '123',
      address: 'Street',
    });

    const deleted = await userService.delete(created.user_id);
    expect(deleted).toBe(true);
    const deletedAgain = await userService.delete(created.user_id);
    expect(deletedAgain).toBe(false);
  });
});
