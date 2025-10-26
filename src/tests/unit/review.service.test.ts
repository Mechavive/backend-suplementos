// src/services/review.service.ts

import reviewService from '../../services/review.service';
import { ReviewInput } from '../../dtos/review.dto';
import { Review } from '../../models/entity/review.entity';

describe('Review Service - Unit Tests', () => {
  let createdReview: Review;

  const sampleReview = new Review(
    1, // review_id
    1, // user_id
    2, // product_id
    5, // qualification
    'Excelente producto',
    new Date(), // date
  );

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
