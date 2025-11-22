// models/implementations/mock/mockReview.ts

import { Review } from '../../entity/review.entity';
import { ReviewCrud } from '../../crud/reviewCrud.interface';
import { ReviewInput } from '../../../dtos/review.dto';

export class MockReview implements ReviewCrud {
  private reviews: Review[] = [];
  private idCounter = 1;

  /* constructor() {
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
  } */

  constructor() {
    this.reviews = [
      // Producto 1: Proteína Whey, rating 4.5
      new Review(
        this.idCounter++,
        1, // user_id
        1, // product_id
        4.5,
        'Excelente proteína, se disuelve muy bien y sabe genial',
        new Date('2025-01-01'),
      ),
      new Review(
        this.idCounter++,
        2,
        1,
        4.4,
        'Muy buena, aunque un poco cara',
        new Date('2025-01-10'),
      ),

      // Producto 2: Proteína Vegetal, rating 4.2
      new Review(
        this.idCounter++,
        3,
        2,
        4.2,
        'Ideal para veganos, buen sabor',
        new Date('2025-02-05'),
      ),

      // Producto 3: Creatina Monohidratada, rating 4.8
      new Review(
        this.idCounter++,
        1,
        3,
        4.8,
        'Me ha dado muy buenos resultados en fuerza',
        new Date('2025-02-15'),
      ),
      new Review(
        this.idCounter++,
        2,
        3,
        4.9,
        'Excelente creatina, se nota la diferencia en mis entrenamientos',
        new Date('2025-02-20'),
      ),

      // Producto 4: BCAA 2:1:1, rating 4.6
      new Review(
        this.idCounter++,
        3,
        4,
        4.6,
        'Perfecto para recuperación después de entrenar',
        new Date('2025-03-01'),
      ),

      // Producto 5: Pre-entreno Hardcore, rating 4.4
      new Review(
        this.idCounter++,
        1,
        5,
        4.4,
        'Me da mucha energía antes del entrenamiento',
        new Date('2025-03-05'),
      ),

      // Producto 6: Multivitamínico Daily, rating 4.3
      new Review(
        this.idCounter++,
        2,
        6,
        4.3,
        'Me siento con más energía y vitaminas cubiertas',
        new Date('2025-03-10'),
      ),

      // Producto 7: L-Carnitina, rating 4.1
      new Review(
        this.idCounter++,
        3,
        7,
        4.1,
        'Buena ayuda para acompañar dieta de pérdida de grasa',
        new Date('2025-03-15'),
      ),

      // Producto 8: Electrolitos en Polvo, rating 4.5
      new Review(
        this.idCounter++,
        1,
        8,
        4.5,
        'Muy útil para mantenerme hidratado en entrenamientos largos',
        new Date('2025-03-20'),
      ),

      // Producto 9: Barra Proteica Chocolate, rating 4.6
      new Review(
        this.idCounter++,
        2,
        9,
        4.6,
        'Deliciosa y práctica como snack post-entreno',
        new Date('2025-03-25'),
      ),

      // Producto 10: Omega 3 1000mg, rating 4.7
      new Review(
        this.idCounter++,
        3,
        10,
        4.7,
        'Siento mis articulaciones más flexibles y buena digestión',
        new Date('2025-03-30'),
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
    const date = data.date || new Date();
    const newReview = new Review(
      this.idCounter++,
      data.user_id,
      data.product_id,
      data.qualification,
      data.comment,
      date,
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
