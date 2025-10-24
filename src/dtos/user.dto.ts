// src/dtos/user.dto.ts
import { User } from '../models/entity/user.entity.js';

export type UserInput = Omit<User, 'user_id'>;
