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
    // Verificar que el producto exista
    const product = await MockProduct.getById(productId);
    if (!product) {
      throw new Error(`El producto con id ${productId} no existe`);
    }

    return MockReview.getByProductId(productId);
  }

  async create(data: ReviewInput): Promise<Review> {
    // Verificar que el producto exista
    const product = await MockProduct.getById(data.product_id);
    if (!product) {
      throw new Error(`El producto con id ${data.product_id} no existe`);
    }

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

  // Método privado para recalcular rating (si tiene rating inicial sobrescribe con el primer review y luego hace avg)
  private async updateProductRating(productId: number) {
    const product = await MockProduct.getById(productId);
    if (!product) return;

    const reviews = await MockReview.getByProductId(productId);

    let totalScore = reviews.reduce((sum, r) => sum + r.qualification, 0);
    let totalCount = reviews.length;

    // Solo considerar rating inicial si ya existe
    if (product.rating && product.rating > 0) {
      totalScore += product.rating;
      totalCount += 1;
    }

    const avg = totalCount === 0 ? 0 : totalScore / totalCount;
    product.rating = parseFloat(avg.toFixed(1));
  }
}

export default new ReviewService();
