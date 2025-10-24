// src/middlewares/role.middleware.ts
import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware.js";

/**
 * Middleware para autorizar según el rol del usuario autenticado.
 * @param roles - Uno o varios roles permitidos ("ADMIN" | "USER")
 */
export const authorizeRole = (...roles: ("ADMIN" | "USER")[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "No autenticado" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Acceso denegado" });
    }

    next();
  };
};
