import { Cart } from './../../entity/cart.entity';
import { CartCrud } from './../../crud/cartCrud.interface';
import { CartInput } from './../../../dtos/cart.dto';

import MockItemCart from './mockItemCart';
import { ItemCart } from '../../entity/itemCart.entity';

export class MockCart implements CartCrud {
  private carts: Cart[] = [];
  private idCounter = 1;

  constructor() {
    // Carritos separados por usuario
    this.carts.push(new Cart(this.idCounter++, 1)); // Usuario 1
    this.carts.push(new Cart(this.idCounter++, 2)); // Usuario 2
    this.carts.push(new Cart(this.idCounter++, 3)); // Usuario 3
    this.carts.push(new Cart(this.idCounter++, 4)); // Usuario 4
    this.carts.push(new Cart(this.idCounter++, 5)); // Usuario 5
    this.carts.push(new Cart(this.idCounter++, 6)); // Usuario 6
    this.carts.push(new Cart(this.idCounter++, 7)); // Usuario 7
    this.carts.push(new Cart(this.idCounter++, 8)); // Usuario 8
    this.carts.push(new Cart(this.idCounter++, 9)); // Usuario 9
    this.carts.push(new Cart(this.idCounter++, 10)); // Usuario 10
    this.carts.push(new Cart(this.idCounter++, 11)); // Usuario 11
    this.carts.push(new Cart(this.idCounter++, 12)); // Usuario 12
  }

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

  getById(id: number): Promise<Cart | undefined> {
    return new Promise((resolve) => {
      const result = this.carts.find((c) => c.getCartId() === id);
      resolve(result);
    });
  }

  // deuelve undefined si no encuentra el carrito (permite que el servicio decida que hacer)
  getCartByUserId(userId: number): Promise<Cart | undefined> {
    return new Promise((resolve) => {
      const result = this.carts.find((c) => c.getUserId() === userId);
      resolve(result);
    });
  }

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

  // delete(id: number): Promise<void> {
  //   return new Promise<void>((resolve, reject) => {
  //     const index = this.carts.findIndex((cart: Cart) => cart.getCartId() === id);
  //     if (index === -1) {
  //       reject(new Error(`Cart with id:${id} doesn't exist`));
  //     } else {
  //       this.carts.splice(index, 1);
  //       resolve();
  //     }
  //   });
  // }

  delete(id: number): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      const initialLength = this.carts.length;
      this.carts = this.carts.filter((cart: Cart) => cart.getCartId() !== id);
      // true si eliminó algo, false si no existía
      resolve(this.carts.length < initialLength);
    });
  }

  deleteByUserId(userId: number): Promise<void> {
    return new Promise((resolve) => {
      this.carts = this.carts.filter((c) => c.getUserId() !== userId);
      resolve();
    });
  }
}

export default new MockCart();
