import MockCartModel from '../models/implementations/mock/mockCart.js';
import { Cart } from './../models/entity/cart.entity.js';
import { CartCrud } from './../models/crud/cartCrud.interface.js';

class CartService {
  async getAll(): Promise<Cart[]> {
    return MockCartModel.getAll();
  }
  async getById(id: number): Promise<Cart | undefined> {
    return MockCartModel.getById(id);
  }
  async getCartByUserId(userId: number): Promise<Cart | undefined> {
    return MockCartModel.getCartByUserId(userId);
  }
  async create(cart: Cart): Promise<Cart> {
    return MockCartModel.create(cart);
  }
  async delete(id: number): Promise<void> {
    return MockCartModel.delete(id);
  }
}

export default new CartService();
