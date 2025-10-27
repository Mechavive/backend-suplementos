// src/dtos/review.dto.ts
import { Review } from '../models/entity/review.js';

export type ReviewInput = Omit<Review, 'review_id'>;
