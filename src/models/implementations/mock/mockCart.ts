import { Cart } from './../../entity/cart.entity';
import { CartCrud } from './../../crud/cartCrud.interface';

export class MockCart implements CartCrud {
  private carts: Cart[] = [];
  private idCounter = 1;
  constructor() {
    this.carts = [new Cart(this.idCounter++, 1), new Cart(this.idCounter++, 2)];
  }

  getAll(): Promise<Cart[]> {
    return new Promise<Cart[]>((resolve) => {
      resolve(this.carts);
    });
  }

  getById(id: number): Promise<Cart | undefined> {
    return new Promise<Cart | undefined>((resolve, reject) => {
      const result = this.carts.find((c: Cart) => c.getCartId() === id);
      if (!result) {
        reject(new Error(`Cart with id ${id} doesn't exist`));
      } else {
        resolve(result);
      }
    });
  }

  getCartByUserId(userId: number): Promise<Cart | undefined> {
    return new Promise<Cart | undefined>((resolve, reject) => {
      const result = this.carts.find((c: Cart) => c.getUserId() === userId);
      if (!result) {
        reject(new Error(`Cart with userId ${userId} doesn't exist`));
      } else {
        resolve(result);
      }
    });
  }

  create(cart: Cart): Promise<Cart> {
    return new Promise<Cart>((resolve) => {
      cart.setCartId(this.idCounter);
      this.carts.push(cart);
      this.idCounter++;
      resolve(cart);
    });
  }

  delete(id: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const index = this.carts.findIndex((cart: Cart) => cart.getCartId() === id);
      if (index === -1) {
        reject(new Error(`Cart with id:${id} doesn't exist`));
      } else {
        this.carts.splice(index, 1);
        resolve();
      }
    });
  }
}

export default new MockCart();
