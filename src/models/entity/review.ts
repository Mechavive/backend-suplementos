// models/interface/review.ts

export interface Review {
  review_id: number;
  user_id: number;
  product_id: number;
  qualification: number; // 1 to 5
  comment: string;
  date: Date;
}
