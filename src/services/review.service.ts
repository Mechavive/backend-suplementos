// src/services/review.service.ts

import MockReview from '../models/implementations/mock/mockReview';
import MockProduct from '../models/implementations/mock/mockProduct';
import { Review } from '../models/entity/review.entity';
import { ReviewInput } from '../dtos/review.dto';

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
    const newReview = await MockReview.create(data);

    // Recalcular rating del producto
    await this.updateProductRating(data.product_id);

    return newReview;
  }

  async delete(id: number): Promise<boolean> {
    const review = await MockReview.getById(id);
    if (!review) return false;

    const success = await MockReview.delete(id);

    if (success) {
      await this.updateProductRating(review.product_id);
    }

    return success;
  }

  // Método privado para recalcular rating
  private async updateProductRating(productId: number) {
    const product = await MockProduct.getById(productId);
    if (!product) return;

    const reviews = await MockReview.getByProductId(productId);
    const avg =
      reviews.length === 0
        ? 0
        : reviews.reduce((sum, r) => sum + r.qualification, 0) / reviews.length;

    product.rating = parseFloat(avg.toFixed(1));
  }
}

export default new ReviewService();
