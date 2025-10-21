// src/schemas/order.schema.ts

import { z } from 'zod';

export const orderInputSchema = z.object({
  user_id: z.number().int().positive(),
  //status: z.enum(["pending", "paid", "cancel"]), //todas empiezan conmo "pending"
  total: z.number().min(0),
  order_date: z.coerce.date(), // acepta string y lo convierte a Date
});

export const orderStatusSchema = z.object({
  status: z.enum(['pending', 'paid', 'cancel']),
});
