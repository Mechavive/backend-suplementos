import { z } from 'zod';

export const cartSchema = z.object({
  cart_id: z.number().int().positive(),
  user_id: z.number().int().positive(),
});
