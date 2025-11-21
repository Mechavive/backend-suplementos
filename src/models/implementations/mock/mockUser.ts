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
      new User(
        this.idCounter++,
        'Usuario Normal2',
        'user2@email.com',
        '$2b$10$30IIWEEsA7Y90kSt9iNr4ex52CX.fsAp4Y5Sd0x1xoHcSvet27dQO',
        'User2 Street 456',
        UserRole.USER,
      ),
      new User(
        this.idCounter++,
        'Usuario Normal3',
        'user3@email.com',
        '$2b$10$GZpiEOeDs3a9M7bR.tfUfuYnzxAIElzjS9afwhaZ/5ucwe2/pLPS.',
        'User3 Street 456',
        UserRole.USER,
      ),
      new User(
        this.idCounter++,
        'Mariana User',
        'mariana@email.com',
        '$2b$10$L0ihRhEsdhJk.uGxYXhNOenhzZgyTDvvrV1t9H3DDseM2.3NQRLD.',
        'Av. Siempre Viva 123',
        UserRole.USER,
      ),
      new User(
        this.idCounter++,
        'Pablo Paredes',
        'pablo@email.com',
        '$2b$10$Ml9znIOiHniFzZv6kUge7ORP57WfeFj9r43oZh53TbW4nUd.Wr1fi',
        'Av. Sarmiento 123',
        UserRole.USER,
      ),
      new User(
        this.idCounter++,
        'Eve Gonzalez',
        'eve@email.com',
        '$2b$10$DZUHBANhr2a3llsnTw/0mOgtZG22w5FiqoldKT.w4qwWF3NkxUGpC',
        'Av. Colon 123',
        UserRole.USER,
      ),
      new User(
        this.idCounter++,
        'Jose Rodriguez',
        'jose@email.com',
        '$2b$10$fCSXaATbOA5V91ll.mD.LeTK40MKbwL.KE6MmyyZO4JiosKxJ8dKy',
        'Av. 9 de Julio 123',
        UserRole.USER,
      ),
      new User(
        this.idCounter++,
        'Juan Perez',
        'juan@email.com',
        '$2b$10$5Y0n5MkyBfb3.ectg.athe70uzm8o2BcwCY6QBAaI5VkInNA/vhoq',
        'Av. Libertadores 123',
        UserRole.USER,
      ),
      new User(
        this.idCounter++,
        'Sofia Perez',
        'sofia@email.com',
        '$2b$10$Fadb316EShazdnz9v6c7NuJIeFYFfgr3VZpehMcqc0/hrtb9/CcFK',
        'Av. Libertadores 123',
        UserRole.USER,
      ),
      new User(
        this.idCounter++,
        'Guillermo Brown',
        'guille@email.com',
        '$2b$10$59CGLNaDZ71gbLhraee9rugFSqUEIR8z8IRvyOaTIDe3Tn9oGX.0a',
        'Av. La Plata 123',
        UserRole.USER,
      ),
      new User(
        this.idCounter++,
        'Gabriel Garcia',
        'gabriel@email.com',
        '$2b$10$lg3AmXv.c2DWYSY8/BQpEejyR.fVoU.o/YvOA9h5x3gUDiTX3bveW',
        'Av. Literatura 123',
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
