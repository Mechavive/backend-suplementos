import { ItemCart } from '../models/entity/itemCart.entity';

export interface ItemCartInput {
  cart_id: number;
  product_id: number;
  quantity: number;
}
