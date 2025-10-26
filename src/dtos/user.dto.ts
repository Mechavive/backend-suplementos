// src/dtos/user.dto.ts
import { User } from '../models/entity/user.entity';

export type UserInput = Omit<User, 'user_id'>;
