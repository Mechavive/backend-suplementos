// version sincronica
/* import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/jwt.config';
import UserService from './user.service';
import { User } from '../models/entity/user.entity';

export class AuthService {
  async validateUser(email: string, password: string): Promise<User | null> {
    const users = await UserService.getAll();
    const user = users.find((u) => u.email === email);
    if (!user) return null;

    const isValid = await bcrypt.compare(password, user.password);
    return isValid ? user : null;
  }

  generateToken(user: User): string {
    return jwt.sign(
      { user_id: user.user_id, role: user.role },
      jwtConfig.secret,
      { expiresIn: jwtConfig.expiresIn },
    );
  }
}

export default new AuthService(); */

// version asincronica

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/jwt.config';
import UserService from './user.service';
import { User } from '../models/entity/user.entity';

export class AuthService {
  // Validar usuario con email y password
  async validateUser(email: string, password: string): Promise<User | null> {
    // En la versión real, UserService.getByEmail sería async y consultaría la DB
    const user = await UserService.getByEmail(email);
    if (!user) return null;

    const isValid = await bcrypt.compare(password, user.password);
    return isValid ? user : null;
  }

  // Generar JWT de forma asíncrona
  async generateToken(user: User): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(
        { user_id: user.user_id, role: user.role },
        jwtConfig.secret,
        { expiresIn: jwtConfig.expiresIn },
        (err: Error | null, token?: string) => {
          if (err || !token) return reject(err);
          resolve(token);
        },
      );
    });
  }
}

export default new AuthService();
