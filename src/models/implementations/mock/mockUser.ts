// models/implementations/mock/mockUser.ts
import { User, UserRole } from '../../entity/user.entity';
import { UserCrud } from '../../crud/userCrud.interface';
import { UserInput } from '../../../dtos/user.dto';

import CartModel from './mockCart';

export class MockUser implements UserCrud {
  private users: User[] = [];
  private idCounter = 1;

  constructor() {
    // Datos iniciales simulados
    this.users = [
      new User(
        this.idCounter++,
        'Administrador',
        'admin@admin.com',
        '$2b$10$ro0s/0TmX/GlC5FJyEswv.lducVaejVNZK5GgEnVROxjEtD.BYe3m',
        'Admin Street 123',
        UserRole.ADMIN,
      ),
      new User(
        this.idCounter++,
        'Usuario Normal',
        'user1@email.com',
        '$2b$10$5Fsj.IAfr4DNPejUMv3kRunQGzRChGlkw1R5gVSkTA9bGf.5vjMo.',
        'User Street 456',
        UserRole.USER,
      ),
    ];
  }

  async getAll(): Promise<User[]> {
    return this.users;
  }

  async getById(id: number): Promise<User | undefined> {
    return this.users.find((user) => user.user_id === id);
  }

  async create(data: UserInput): Promise<User> {
    const newUser = new User(
      this.idCounter++,
      data.name,
      data.email,
      data.password,
      data.address,
      data.role || UserRole.USER,
    );
    this.users.push(newUser);

    // Crear automáticamente su carrito
    await CartModel.getOrCreateCartForUser(newUser.user_id);

    return newUser;
  }

  async update(id: number, data: Partial<UserInput>): Promise<User | undefined> {
    const index = this.users.findIndex((u) => u.user_id === id);
    if (index === -1) return undefined;

    const existing = this.users[index]!;

    if (data.name) existing.name = data.name;
    if (data.email) existing.email = data.email;
    if (data.password) existing.password = data.password;
    if (data.address) existing.address = data.address;
    if (data.role) existing.role = data.role;

    return existing;
  }

  async delete(id: number): Promise<boolean> {
    const initialLength = this.users.length;
    this.users = this.users.filter((u) => u.user_id !== id);
    return this.users.length < initialLength;
  }

  clear(): void {
    this.users = [];
    this.idCounter = 1;
  }
}

export default new MockUser();
