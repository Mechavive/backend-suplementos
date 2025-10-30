// src/controllers/auth.controller.ts
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import MockUser from '../models/implementations/mock/mockUser';

const JWT_SECRET = process.env.JWT_SECRET ?? 'super_secret_key';
const JWT_EXPIRES_IN = '1h';

interface LoginBody {
  email: string;
  password: string;
}

class AuthController {
  async login(req: Request<{}, {}, LoginBody>, res: Response) {
    try {
      const { email, password } = req.body;

      // Buscar usuario en el mock
      const users = await MockUser.getAll();
      const user = users.find((u) => u.email === email);
      if (!user) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }

      // Comparar contraseñas
      // TODO: ver como usar hash
      const isPasswordValid = await bcrypt.compare(password, user.password);

      // para testing rapido con string
      //const isPasswordValid = password === user.password;
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }

      // Crear JWT
      const token = jwt.sign({ user_id: user.user_id, role: user.role }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
      });

      return res.json({
        message: 'Login exitoso',
        token,
        user: {
          user_id: user.user_id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
}

export default new AuthController();
