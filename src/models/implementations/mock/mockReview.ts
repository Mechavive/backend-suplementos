// models/implementations/mock/mockReview.ts

import { Review } from '../../entity/review.entity';
import { ReviewCrud } from '../../crud/reviewCrud.interface';
import { ReviewInput } from '../../../dtos/review.dto';

export class MockReview implements ReviewCrud {
  private reviews: Review[] = [];
  private idCounter = 1;

  constructor() {
    // Datos iniciales simulados como instancias de Review
    this.reviews = [
      new Review(
        this.idCounter++, // review_id
        1, // user_id
        2, // product_id
        4.5, // qualification
        'Excelente producto', // comment
        new Date('2023-01-01'), // date
      ),
      new Review(
        this.idCounter++,
        2,
        2,
        4.8,
        'Muy bueno, aunque llegó tarde',
        new Date('2023-02-15'),
      ),
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
    const newReview = new Review(
      this.idCounter++,
      data.user_id,
      data.product_id,
      data.qualification,
      data.comment,
      data.date,
    );
    this.reviews.push(newReview);
    return newReview;
  }

  async delete(id: number): Promise<boolean> {
    const initialLength = this.reviews.length;
    this.reviews = this.reviews.filter((r) => r.review_id !== id);
    return this.reviews.length < initialLength;
  }

  clear(): void {
    this.reviews = [];
    this.idCounter = 1;
  }
}

export default new MockReview();
