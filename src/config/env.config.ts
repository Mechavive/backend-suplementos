// src/config/env.config.ts
import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  // API KEY
  API_KEY: z.string(),
});

const env = envSchema.parse(process.env);

export default env;
