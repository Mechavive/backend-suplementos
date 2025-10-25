// src/middlewares/auth.middleware.ts
/* import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// 🔹 Clave secreta (deberías ponerla en variables de entorno)
const JWT_SECRET = process.env.JWT_SECRET || "super_secret_key";

export interface AuthRequest extends Request {
  user?: {
    user_id: number;
    role: "ADMIN" | "USER";
  };
}

export const authenticateJWT = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      user_id: number;
      role: "ADMIN" | "USER";
    };

    req.user = decoded; // guardamos los datos en req.user
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token inválido o expirado" });
  }
}; */

/* import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// 🔹 Clave secreta (deberías moverla a variables de entorno)
const JWT_SECRET = process.env.JWT_SECRET || "super_secret_key";

export interface AuthRequest extends Request {
  user?: {
    user_id: number;
    role: "ADMIN" | "USER";
  };
}

export const authenticateJWT = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  // 🔸 Validamos que el header esté presente
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // 🔸 Verificamos el token y aseguramos el tipo
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload & {
      user_id: number;
      role: "ADMIN" | "USER";
    };

    // 🔸 Validamos que tenga los campos esperados
    if (!decoded.user_id || !decoded.role) {
      return res.status(403).json({ message: "Token inválido" });
    }

    req.user = { user_id: decoded.user_id, role: decoded.role };
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token inválido o expirado" });
  }
}; */
/* 
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// 🔹 Clave secreta (usa variables de entorno en producción)
const JWT_SECRET: string = process.env.JWT_SECRET ?? "super_secret_key";

export interface AuthRequest extends Request {
  user?: {
    user_id: number;
    role: "ADMIN" | "USER";
  };
}

export const authenticateJWT = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // ⚡ convertimos explícitamente a unknown primero (soluciona el error de tipo)
    const decoded = jwt.verify(token, JWT_SECRET) as unknown as JwtPayload & {
      user_id: number;
      role: "ADMIN" | "USER";
    };

    if (!decoded.user_id || !decoded.role) {
      return res.status(403).json({ message: "Token inválido" });
    }

    req.user = { user_id: decoded.user_id, role: decoded.role };
    next();
  } catch {
    return res.status(403).json({ message: "Token inválido o expirado" });
  }
}; */

/* import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// ✅ Aseguramos que la clave SIEMPRE sea string
const JWT_SECRET = (process.env.JWT_SECRET || "super_secret_key") as string;

export interface AuthRequest extends Request {
  user?: {
    user_id: number;
    role: "ADMIN" | "USER";
  };
}

export const authenticateJWT = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // 👇 Convertimos a unknown antes de castear, para evitar el error del tipo JwtPayload
    const decoded = jwt.verify(token, JWT_SECRET) as unknown as JwtPayload & {
      user_id: number;
      role: "ADMIN" | "USER";
    };

    if (!decoded.user_id || !decoded.role) {
      return res.status(403).json({ message: "Token inválido" });
    }

    req.user = { user_id: decoded.user_id, role: decoded.role };
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token inválido o expirado" });
  }
}; */

// src/middlewares/auth.middleware.ts
/* import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET: string = process.env.JWT_SECRET ?? "super_secret_key"; // ✅ siempre string

export interface AuthRequest extends Request {
  user?: {
    user_id: number;
    role: "ADMIN" | "USER";
  };
}

export const authenticateJWT = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // ✅ convertimos a unknown primero, luego a nuestro tipo
    const decoded = jwt.verify(token, JWT_SECRET) as unknown as JwtPayload & {
      user_id: number;
      role: "ADMIN" | "USER";
    };

    if (!decoded || !decoded.user_id || !decoded.role) {
      return res.status(403).json({ message: "Token inválido" });
    }

    req.user = {
      user_id: decoded.user_id,
      role: decoded.role,
    };

    next();
  } catch (err) {
    return res.status(403).json({ message: "Token inválido o expirado" });
  }
}; */

// src/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

// ✅ Asegúrate de tener una clave secreta en .env
const JWT_SECRET: string = process.env.JWT_SECRET ?? 'super_secret_key';

// Extendemos Request para que tenga el usuario autenticado
export interface AuthRequest extends Request {
  user?: {
    user_id: number;
    role: 'ADMIN' | 'USER';
  };
}

export const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  // 1️⃣ Validamos que venga el header
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];

  // 2️⃣ Validamos que token no sea undefined
  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  try {
    // 3️⃣ Verificamos y decodificamos el token
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload & {
      user_id: number;
      role: 'ADMIN' | 'USER';
    };

    // 4️⃣ Validamos que contenga user_id y role
    if (!decoded.user_id || !decoded.role) {
      return res.status(403).json({ message: 'Token inválido' });
    }

    // 5️⃣ Asignamos la info del usuario al request
    req.user = {
      user_id: decoded.user_id,
      role: decoded.role,
    };

    next(); // ✅ Pasamos al siguiente middleware / ruta
  } catch (err) {
    return res.status(403).json({ message: 'Token inválido o expirado' });
  }
};
