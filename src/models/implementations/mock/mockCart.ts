import { Cart } from './../../interface/cart.js';
import { CartCrud } from './../../crud/cartCrud.interface.js';

export class MockCart implements CartCrud {
  private carts: Cart[] = [];
  private idCounter = 1;
  constructor() {
    this.carts = [
      {
        cart_id: this.idCounter++,
        user_id: 1,
      },
      {
        cart_id: this.idCounter++,
        user_id: 2,
      },
    ];
  }

  async getAll(): Promise<Cart[]> {
    return this.carts;
  }

  async getById(id: number): Promise<Cart | undefined> {
    return this.carts.find((c) => c.cart_id === id);
  }

  async getCartByUserId(userId: number): Promise<Cart | undefined> {
    return this.carts.find((c) => c.user_id === userId);
  }

  async create(cart: Cart): Promise<Cart> {
    const newCart: Cart = {
      ...cart,
      cart_id: this.idCounter++,
    };

    this.carts.push(newCart);
    return newCart;
  }

  async delete(id: number): Promise<boolean> {
    const initialCartLengh = this.carts.length;
    this.carts = this.carts.filter((c) => c.cart_id !== id);
    return this.carts.length < initialCartLengh;
  }
}

export default new MockCart();
