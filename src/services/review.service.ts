// src/services/review.service.ts

import MockReview from '../models/implementations/mock/mockReview.js';
import { Review } from '../models/entity/review.entity.js';
import { ReviewInput } from '../dtos/review.dto.js';

class ReviewService {
  async getAll(): Promise<Review[]> {
    return MockReview.getAll();
  }

  async getById(id: number): Promise<Review | undefined> {
    return MockReview.getById(id);
  }

  async getByProductId(productId: number): Promise<Review[]> {
    return MockReview.getByProductId(productId);
  }

  async create(data: ReviewInput): Promise<Review> {
    return MockReview.create(data);
  }

  async delete(id: number): Promise<boolean> {
    return MockReview.delete(id);
  }
}

export default new ReviewService();
