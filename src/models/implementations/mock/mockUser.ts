// models/implementations/mock/mockUser.ts
/* 
import { User, UserRole } from '../../entity/user.entity.js';
import { UserCrud } from '../../crud/userCrud.interface.js';
import { UserInput } from '../../../dtos/user.dto.js';

export class MockUser implements UserCrud {
  private users: User[] = [];
  private idCounter = 1;

  constructor() {
    this.users = [
      {
        user_id: this.idCounter++,
        name: 'Administrador',
        email: 'admin@admin.com',
        password: 'hashed_admin_password',
        address: 'Admin Street 123',
        role: UserRole.ADMIN,
      },
      {
        user_id: this.idCounter++,
        name: 'Usuario Normal',
        email: 'user1@email.com',
        password: 'hashed_user1_password',
        address: 'User Street 456',
        role: UserRole.USER,
      },
    ];
  }

  async getAll(): Promise<User[]> {
    return this.users;
  }

  async getById(id: number): Promise<User | undefined> {
    return this.users.find((user) => user.user_id === id);
  }

  async create(data: UserInput): Promise<User> {
    const newUser: User = {
      ...data,
      user_id: this.idCounter++,
      role: data.role || UserRole.USER, // Por defecto "USER"
    };
    this.users.push(newUser);
    return newUser;
  }

  //   async update(id: number, data: Partial<User>): Promise<User | undefined> {
  //     const index = this.users.findIndex((u) => u.user_id === id);
  //     if (index === -1) return undefined;
  //     this.users[index] = { ...this.users[index], ...data };
  //     return this.users[index];
  //   }

  async update(id: number, data: Partial<User>): Promise<User | undefined> {
    const index = this.users.findIndex((u) => u.user_id === id);
    if (index === -1) return undefined;

    const existing = this.users[index]!;

    const updated = {
      ...existing,
      ...data,
      user_id: existing.user_id, // protección contra actualización del ID
    } as User;

    this.users[index] = updated;
    return updated;
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

export default new MockUser(); */

// models/implementations/mock/mockUser.ts
import { User, UserRole } from '../../entity/user.entity';
import { UserCrud } from '../../crud/userCrud.interface';
import { UserInput } from '../../../dtos/user.dto';

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
        'hashed_admin_password',
        'Admin Street 123',
        UserRole.ADMIN,
      ),
      new User(
        this.idCounter++,
        'Usuario Normal',
        'user1@email.com',
        'hashed_user1_password',
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
