// src/controllers/auth.controller.ts

//version sincronica
/* import { Request, Response } from 'express';
import AuthService from '../services/auth.service';

interface LoginBody {
  email: string;
  password: string;
}

class AuthController {
  async login(req: Request<{}, {}, LoginBody>, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await AuthService.validateUser(email, password);
      if (!user) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }

      const token = AuthService.generateToken(user);

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

export default new AuthController(); */

// version asincronica
import { Request, Response } from 'express';
import AuthService from '../services/auth.service';

interface LoginBody {
  email: string;
  password: string;
}

class AuthController {
  async login(req: Request<{}, {}, LoginBody>, res: Response) {
    try {
      const { email, password } = req.body;

      // Validar usuario
      const user = await AuthService.validateUser(email, password);
      if (!user) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }

      // Generar token asíncrono
      const token = await AuthService.generateToken(user);

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
    } catch (err: any) {
      console.error(err);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
}

export default new AuthController();
