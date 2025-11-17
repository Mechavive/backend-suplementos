// src/services/review.service.ts

/* import reviewService from '../../services/review.service';
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
  it('deberia crear una nueva review', async () => {
    //console.log('Created review:', createdReview);
    expect(createdReview).toHaveProperty('review_id');
    expect(createdReview.comment).toBe(sampleReview.comment);
  });

  it('deberia devolver todas las reviews', async () => {
    const all = await reviewService.getAll();
    //console.log('All reviews:', all);
    expect(all.length).toBeGreaterThan(0);
  });

  it('deberia devolver reviews por producto_id', async () => {
    const reviews = await reviewService.getByProductId(sampleReview.product_id);
    //console.log(`Reviews for product_id=${sampleReview.product_id}:`, reviews);
    expect(reviews.length).toBeGreaterThan(0);
    expect(reviews[0]!.product_id).toBe(sampleReview.product_id);
  });

  it('deberia eliminar una review', async () => {
    const deleted = await reviewService.delete(createdReview.review_id);
    //console.log(`Deleted review with id ${createdReview.review_id}:`, deleted);
    expect(deleted).toBe(true);

    const deletedAgain = await reviewService.delete(createdReview.review_id);
    //console.log(`Deleted again review with id ${createdReview.review_id}:`, deletedAgain);
    expect(deletedAgain).toBe(false);
  });
}); */

// src/services/review.service.spec.ts
import reviewService from '../../services/review.service';
import MockProduct from '../../models/implementations/mock/mockProduct';
import MockReview from '../../models/implementations/mock/mockReview';
import { Review } from '../../models/entity/review.entity';

jest.mock('../../models/implementations/mock/mockProduct');
jest.mock('../../models/implementations/mock/mockReview');

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
    // Mockear que el producto existe
    (MockProduct.getById as jest.Mock).mockResolvedValue({ product_id: 2, rating: 0 });

    // Mockear create de review
    (MockReview.create as jest.Mock).mockImplementation(async (review) => review);

    // Mockear getAll
    (MockReview.getAll as jest.Mock).mockResolvedValue([sampleReview]);

    // Mockear getByProductId
    (MockReview.getByProductId as jest.Mock).mockResolvedValue([sampleReview]);

    // Mockear getById
    (MockReview.getById as jest.Mock).mockResolvedValue(sampleReview);

    // Mockear delete
    (MockReview.delete as jest.Mock).mockResolvedValue(true);

    createdReview = await reviewService.create(sampleReview);
  });

  it('deberia crear una nueva review', async () => {
    expect(createdReview).toHaveProperty('review_id');
    expect(createdReview.comment).toBe(sampleReview.comment);
  });

  it('deberia devolver todas las reviews', async () => {
    const all = await reviewService.getAll();
    expect(all.length).toBeGreaterThan(0);
    expect(all[0]).toEqual(sampleReview);
  });

  it('deberia devolver reviews por product_id existente', async () => {
    const reviews = await reviewService.getByProductId(sampleReview.product_id);
    expect(reviews.length).toBeGreaterThan(0);
    expect(reviews[0]!.product_id).toBe(sampleReview.product_id);
  });

  it('deberia lanzar error si getByProductId usa un product_id que no existe', async () => {
    // Simular producto inexistente
    (MockProduct.getById as jest.Mock).mockResolvedValueOnce(undefined);

    await expect(reviewService.getByProductId(999)).rejects.toThrow(
      'El producto con id 999 no existe',
    );
  });

  it('deberia eliminar una review', async () => {
    const deleted = await reviewService.delete(createdReview.review_id);
    expect(deleted).toBe(true);

    // Mockear delete fallido
    (MockReview.getById as jest.Mock).mockResolvedValueOnce(undefined);
    const deletedAgain = await reviewService.delete(createdReview.review_id);
    expect(deletedAgain).toBe(false);
  });
});
