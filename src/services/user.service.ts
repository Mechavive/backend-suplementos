/* import { User, UserRole } from "../models/interface/user.js";
import { UserCrud } from "../models/crud/userCrud.interface.js";
import { MockUser } from "../models/implementations/mock/mockUser.js";

export class UserService implements UserCrud {
  private users: User[] = [...MockUser];
  private nextId = this.users.length + 1;

  create(userData: Omit<User, "user_id">): User {
    const role = userData.role || UserRole.USER;
    const newUser: User = {
      ...userData,
      user_id: this.nextId++,
      role,
    };
    this.users.push(newUser);
    return newUser;
  }

  getAll(): User[] {
    return this.users;
  }

  getById(id: number): User | undefined {
    return this.users.find(u => u.user_id === id);
  }

  update(id: number, userData: Partial<User>): User | undefined {
    const index = this.users.findIndex(u => u.user_id === id);
    if (index === -1) return undefined;
    this.users[index] = { ...this.users[index], ...userData };
    return this.users[index];
  }

  delete(id: number): boolean {
    const index = this.users.findIndex(u => u.user_id === id);
    if (index === -1) return false;
    this.users.splice(index, 1);
    return true;
  }
} */

  // src/services/user.service.ts
import { User } from "../models/entity/user.entity.js";
import { UserInput } from "../dtos/user.dto.js";
import mockUser from "../models/implementations/mock/mockUser.js"; // Repositorio en memoria
import bcrypt from "bcrypt";

export class UserService {
  private userRepo = mockUser;

  /**
   * Devuelve todos los usuarios (solo para admin)
   */
  async getAll(): Promise<User[]> {
    return this.userRepo.getAll();
  }

  /**
   * Obtiene un usuario por su ID
   */
  async getById(id: number): Promise<User | undefined> {
    return this.userRepo.getById(id);
  }

  /**
   * Crea un nuevo usuario
   * - Si no se especifica rol, se asigna "USER"
   * - Hashea la contraseña
   */
  async create(data: UserInput): Promise<User> {
    const existing = (await this.userRepo.getAll()).find(
      (u) => u.email === data.email
    );

    if (existing) {
      throw new Error("El email ya está registrado");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser: UserInput = {
      ...data,
      password: hashedPassword,
      role: data.role ?? "USER", // por defecto USER
    };

    return this.userRepo.create(newUser);
  }

  /**
   * Actualiza un usuario
   */
  async update(id: number, data: Partial<User>): Promise<User | undefined> {
    // Si incluye contraseña, la hasheamos antes
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    return this.userRepo.update(id, data);
  }

  /**
   * Elimina un usuario
   */
  async delete(id: number): Promise<boolean> {
    return this.userRepo.delete(id);
  }

  /**
   * Busca usuario por email (útil para login / autenticación)
   */
  async getByEmail(email: string): Promise<User | undefined> {
    const users = await this.userRepo.getAll();
    return users.find((u) => u.email === email);
  }

  /**
   * Valida credenciales de login
   */
  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.getByEmail(email);
    if (!user) return null;

    const isValid = await bcrypt.compare(password, user.password);
    return isValid ? user : null;
  }
}

export default new UserService();
