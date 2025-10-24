// models/crud/reviewCrud.interface.ts

import { Review } from '../entity/review.entity.js';
import { ReviewInput } from '../../dtos/review.dto.js';

export interface ReviewCrud {
  getAll(): Promise<Review[]>;
  getById(id: number): Promise<Review | undefined>;
  getByProductId(productId: number): Promise<Review[]>;
  create(review: ReviewInput): Promise<Review>; // como el id se asigna una vez que se crea lo omitimos como parametro
  delete(id: number): Promise<boolean>;
}
