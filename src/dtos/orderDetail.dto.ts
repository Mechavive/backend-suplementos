// src/dtos/orderDetail.dto.ts

export interface OrderDetailInput {
  order_id: number;
  product_id: number;
  quantity: number;
  unit_price: number;
}
