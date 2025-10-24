// src/dtos/review.dto.ts
import { ReviewEntity } from '../models/entity/review.entity.js';

export type ReviewInput = Omit<ReviewEntity, 'review_id'>;
