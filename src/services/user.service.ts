// src/services/user.service.ts
import { User, UserRole } from '../models/entity/user.entity';
import { UserInput } from '../dtos/user.dto';
import mockUser from '../models/implementations/mock/mockUser'; // Repositorio en memoria
import bcrypt from 'bcrypt';

export class UserService {
  private userRepo = mockUser;
  // Devuelve todos los usuarios (solo para admin)

  async getAll(): Promise<User[]> {
    return this.userRepo.getAll();
  }

  // Obtiene un usuario por su ID
  async getById(id: number): Promise<User | undefined> {
    return this.userRepo.getById(id);
  }

  // Crea un nuevo usuario
  // - Si no se especifica rol, se asigna "USER"
  // - Hashea la contraseña
  async create(data: UserInput): Promise<User> {
    const existing = (await this.userRepo.getAll()).find((u) => u.email === data.email);

    if (existing) {
      throw new Error('El email ya está registrado');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser: UserInput = {
      ...data,
      password: hashedPassword,
      role: data.role ?? UserRole.USER,
    };

    return this.userRepo.create(newUser);
  }

  // Actualiza un usuario
  async update(id: number, data: Partial<User>): Promise<User | undefined> {
    // Si incluye contraseña, la hasheamos antes
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    return this.userRepo.update(id, data);
  }

  //Elimina un usuario
  async delete(id: number): Promise<boolean> {
    return this.userRepo.delete(id);
  }

  // Busca usuario por email (útil para login / autenticación)

  async getByEmail(email: string): Promise<User | undefined> {
    const users = await this.userRepo.getAll();
    return users.find((u) => u.email === email);
  }

  // Valida credenciales de login

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.getByEmail(email);
    if (!user) return null;

    const isValid = await bcrypt.compare(password, user.password);
    return isValid ? user : null;
  }
}

export default new UserService();
