// src/dtos/review.dto.ts
import { Review } from '../models/entity/review.entity';

//export type ReviewInput = Omit<Review, 'review_id'>;
export type ReviewInput = Omit<Review, 'review_id'> & { date?: Date };
