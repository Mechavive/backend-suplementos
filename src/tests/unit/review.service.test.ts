// src/services/review.service.ts

import reviewService from '../../services/review.service.js';
import { ReviewInput } from '../../dtos/review.dto.js';
import { Review } from '../../models/entity/review.entity.js';

describe('Review Service - Unit Tests', () => {
  let createdReview: Review;

  const sampleReview: ReviewInput = {
    user_id: 3,
    product_id: 3,
    qualification: 3,
    comment: 'Regular, esperaba más',
    date: new Date('2025-10-15'),
  };

  beforeAll(async () => {
    createdReview = await reviewService.create(sampleReview);
  });

  // para que me de info en consola
  it('should create a new review', async () => {
    console.log('Created review:', createdReview);
    expect(createdReview).toHaveProperty('review_id');
    expect(createdReview.comment).toBe(sampleReview.comment);
  });

  it('should return all reviews', async () => {
    const all = await reviewService.getAll();
    console.log('All reviews:', all);
    expect(all.length).toBeGreaterThan(0);
  });

  it('should get reviews by product ID', async () => {
    const reviews = await reviewService.getByProductId(sampleReview.product_id);
    console.log(`Reviews for product_id=${sampleReview.product_id}:`, reviews);
    expect(reviews.length).toBeGreaterThan(0);
    expect(reviews[0]!.product_id).toBe(sampleReview.product_id);
  });

  it('should delete a review', async () => {
    const deleted = await reviewService.delete(createdReview.review_id);
    console.log(`Deleted review with id ${createdReview.review_id}:`, deleted);
    expect(deleted).toBe(true);

    const deletedAgain = await reviewService.delete(createdReview.review_id);
    console.log(`Deleted again review with id ${createdReview.review_id}:`, deletedAgain);
    expect(deletedAgain).toBe(false);
  });
});
