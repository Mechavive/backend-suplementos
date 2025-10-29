import { CartInput } from '../../dtos/cart.dto';
import { Cart } from './../entity/cart.entity';

export interface CartCrud {
  getAll(): Promise<Cart[]>;
  getById(id: number): Promise<Cart | undefined>;
  getCartByUserId(userId: number): Promise<Cart | undefined>;
  create(cart: CartInput): Promise<Cart>;
  delete(id: number): Promise<void>;
}
