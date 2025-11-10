import { Cart } from './../../entity/cart.entity';
import { CartCrud } from './../../crud/cartCrud.interface';
import { CartInput } from './../../../dtos/cart.dto';

import MockItemCart from './mockItemCart';
import { ItemCart } from '../../entity/itemCart.entity';

export class MockCart implements CartCrud {
  private carts: Cart[] = [];
  private idCounter = 1;
  constructor() {
    this.carts = [new Cart(this.idCounter++, 1), new Cart(this.idCounter++, 2)];
  }

  // modificamos para que devuelva undefined y no error
  //Así la capa de servicio (OrderService) puede decidir qué hacer (crear uno, lanzar error, etc.).
  // async getCartByUserId(userId: number): Promise<Cart | undefined> {
  //   return this.carts.find(c => c.getUserId() === userId);
  // }

  // Para reforzar la relación 1:1 (un carrito por usuario)
  getOrCreateCartForUser(userId: number): Promise<Cart> {
    return new Promise((resolve) => {
      const existing = this.carts.find((c) => c.getUserId() === userId);
      if (existing) {
        resolve(existing);
      } else {
        const newCart = new Cart(this.idCounter++, userId);
        this.carts.push(newCart);
        resolve(newCart);
      }
    });
  }

  getAll(): Promise<Cart[]> {
    return new Promise<Cart[]>((resolve) => {
      resolve(this.carts);
    });
  }

  getItems(cartId: number): Promise<ItemCart[]> {
    return MockItemCart.getByCartId(cartId);
  }

  // getById(id: number): Promise<Cart | undefined> {
  //   return new Promise<Cart | undefined>((resolve, reject) => {
  //     const result = this.carts.find((c: Cart) => c.getCartId() === id);
  //     if (!result) {
  //       reject(new Error(`Cart with id ${id} doesn't exist`));
  //     } else {
  //       resolve(result);
  //     }
  //   });
  // }

  getById(id: number): Promise<Cart | undefined> {
    return new Promise((resolve) => {
      const result = this.carts.find((c) => c.getCartId() === id);
      resolve(result);
    });
  }

  // si no encuentra el carrito lanza error
  // getCartByUserId(userId: number): Promise<Cart | undefined> {
  //   return new Promise<Cart | undefined>((resolve, reject) => {
  //     const result = this.carts.find((c: Cart) => c.getUserId() === userId);
  //     if (!result) {
  //       reject(new Error(`Cart with userId ${userId} doesn't exist`));
  //     } else {
  //       resolve(result);
  //     }
  //   });
  // }

  // deuelve undefined si no encuentra el carrito (permite que el servicio decida que hacer)
  getCartByUserId(userId: number): Promise<Cart | undefined> {
    return new Promise((resolve) => {
      const result = this.carts.find((c) => c.getUserId() === userId);
      resolve(result);
    });
  }

  // create(data: CartInput): Promise<Cart> {
  //   return new Promise<Cart>((resolve) => {
  //     const newCart = new Cart(this.idCounter++, data.user_id);
  //     this.carts.push(newCart);
  //     resolve(newCart);
  //   });
  // }

  create(data: CartInput): Promise<Cart> {
    return new Promise((resolve) => {
      const existing = this.carts.find((c) => c.getUserId() === data.user_id);
      if (existing) {
        resolve(existing); // evita duplicados (1 usuario tiene 1 cart)
      } else {
        const newCart = new Cart(this.idCounter++, data.user_id);
        this.carts.push(newCart);
        resolve(newCart);
      }
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
  // delete(id: number): Promise<void> {
  //   return new Promise((resolve) => {
  //     this.carts = this.carts.filter(c => c.getCartId() !== id);
  //     resolve();
  //   });
  // }

  deleteByUserId(userId: number): Promise<void> {
    return new Promise((resolve) => {
      this.carts = this.carts.filter((c) => c.getUserId() !== userId);
      resolve();
    });
  }
}

export default new MockCart();
