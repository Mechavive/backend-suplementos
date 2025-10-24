import { User } from "../entity/user.entity.js";

export interface UserCrud {
  create(user: Omit<User, "user_id">): Promise<User>;
  getAll(): Promise<User[]>;
  getById(id: number): Promise<User | undefined>;
  update(id: number, userData: Partial<User>): Promise<User | undefined>;
  delete(id: number): Promise<boolean>;
}
