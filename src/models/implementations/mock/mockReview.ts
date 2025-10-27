// models/implementations/mock/mockReview.ts

import { Review } from '../../entity/review.entity.js';
import { ReviewCrud } from '../../crud/reviewCrud.interface.js';
import { ReviewInput } from '../../../dtos/review.dto.js';

export class MockReview implements ReviewCrud {
  private reviews: Review[] = [];
  private idCounter = 1;

  constructor() {
    // Datos iniciales simulados
    this.reviews = [
      {
        review_id: this.idCounter++,
        user_id: 1,
        product_id: 2,
        qualification: 5,
        comment: 'Excelente producto',
        date: new Date('2023-01-01'),
      },
      {
        review_id: this.idCounter++,
        user_id: 2,
        product_id: 2,
        qualification: 4,
        comment: 'Muy bueno, aunque llegó tarde',
        date: new Date('2023-02-15'),
      },
    ];
  }

  async getAll(): Promise<Review[]> {
    return this.reviews;
  }

  async getById(id: number): Promise<Review | undefined> {
    return this.reviews.find((r) => r.review_id === id);
  }

  async getByProductId(productId: number): Promise<Review[]> {
    return this.reviews.filter((r) => r.product_id === productId);
  }

  async create(data: ReviewInput): Promise<Review> {
    const newReview: Review = {
      ...data,
      review_id: this.idCounter++,
    };
    this.reviews.push(newReview);
    return newReview;
  }

  async delete(id: number): Promise<boolean> {
    const initialLength = this.reviews.length;
    this.reviews = this.reviews.filter((r) => r.review_id !== id);
    return this.reviews.length < initialLength;
  }

  // Método útil para tests
  clear(): void {
    this.reviews = [];
    this.idCounter = 1;
  }
}

export default new MockReview();
