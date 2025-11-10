import { z } from 'zod';

export const CategorySchema = z.object({
  category_id: z.number().int().positive(),
  name: z.string().min(2),
  description: z.string().min(3),
});
