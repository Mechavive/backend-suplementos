/* import { z } from "zod";
import { UserRole } from "../models/interface/user.js";

// Esquema base para un usuario
export const userSchema = z.object({
  user_id: z.number().int().positive(),
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Correo electrónico inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  address: z.string().min(5, "La dirección es demasiado corta"),
  role: z.nativeEnum(UserRole),
});

// Esquema para crear un nuevo usuario (sin user_id)
export const userInputSchema = userSchema.omit({ user_id: true });

// Tipos derivados de los esquemas
export type UserSchema = z.infer<typeof userSchema>;
export type UserInputSchema = z.infer<typeof userInputSchema>; */

import { z } from 'zod';

export const userInputSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  address: z.string().min(5),
  role: z.enum(['ADMIN', 'USER']).optional(), // opcional: por defecto USER
});

export const userUpdateSchema = userInputSchema.partial(); // todos opcionales

export const idParamSchema = z.object({
  id: z.string().regex(/^\d+$/, 'ID debe ser un número válido'),
});
