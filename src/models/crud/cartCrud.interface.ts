import { Cart } from './../entity/cart.entity';

export interface CartCrud {
  getAll(): Promise<Cart[]>;
  getById(id: number): Promise<Cart | undefined>;
  getCartByUserId(userId: number): Promise<Cart | undefined>;
  create(cart: Cart): Promise<Cart>;
  delete(id: number): Promise<void>;
}
