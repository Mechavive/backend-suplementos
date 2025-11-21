/* import { ItemCart } from '../../entity/itemCart.entity';
import { ItemCartCrud } from '../../crud/itemCartCrud.interface';
import { ItemCartInput } from '../../../dtos/itemCart.dto';

export class MockItemCart implements ItemCartCrud {
  private itemCarts: ItemCart[] = [];
  private idCounter = 1;
  constructor() {
    this.itemCarts = [
      new ItemCart(this.idCounter++, 1, 1, 4),
      new ItemCart(this.idCounter++, 2, 2, 2),
    ];
  }

  getAll(): Promise<ItemCart[]> {
    return new Promise<ItemCart[]>((resolve) => {
      resolve(this.itemCarts);
    });
  }

  // para que undefined sea parte del flujo normal (útil en checkout order)
  getByItemId(itemId: number): Promise<ItemCart | undefined> {
    return new Promise((resolve) => {
      const result = this.itemCarts.find((ic: ItemCart) => ic.getItemId() === itemId);
      resolve(result); // devuelve undefined si no existe
    });
  }

  // para que refleje correctamente la relación real de uno a muchos entre carrito y items.
  // y pueda usar el checkout order
  getByCartId(cartId: number): Promise<ItemCart[]> {
    return new Promise<ItemCart[]>((resolve) => {
      const results = this.itemCarts.filter((ic) => ic.getCartId() === cartId);
      resolve(results); // devuelve [] si no encuentra
    });
  }

  // devuelve un array de product asi se obtiene todos los productos del carrito
  // deberia cambiar el crud de itemCart

  // para que refleje correctamente la relación real de uno a muchos entre carrito y items.
  getByProductId(productId: number): Promise<ItemCart[]> {
    return new Promise((resolve, reject) => {
      const results = this.itemCarts.filter((ic) => ic.getProductId() === productId);
      if (results.length === 0) {
        reject(new Error(`No items found for product id ${productId}`));
      } else {
        resolve(results);
      }
    });
  }

  create(data: ItemCartInput): Promise<ItemCart> {
    return new Promise<ItemCart>((resolve) => {
      const newItemCart = new ItemCart(
        this.idCounter++,
        data.cart_id,
        data.product_id,
        data.quantity,
      );
      this.itemCarts.push(newItemCart);
      resolve(newItemCart);
    });
  }

  delete(itemId: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const index = this.itemCarts.findIndex((ic: ItemCart) => ic.getItemId() === itemId);
      if (index === -1) {
        reject(new Error(`ItemCart with id:${itemId} doesn't exist`));
      } else {
        this.itemCarts.splice(index, 1);
        resolve();
      }
    });
  }

  clearByCartId(cartId: number): Promise<void> {
    return new Promise((resolve) => {
      console.log(`[MockItemCart] Clearing items for cart ${cartId}`); // logs para verificacion
      this.itemCarts = this.itemCarts.filter((ic) => ic.getCartId() !== cartId);
      console.log(
        `[MockItemCart] Remaining:`,
        this.itemCarts.map((ic) => ic.toJSON()),
      ); //logs para verificacion
      resolve();
    });
  }
}

export default new MockItemCart(); */

import { ItemCart } from '../../entity/itemCart.entity';
import { ItemCartCrud } from '../../crud/itemCartCrud.interface';
import { ItemCartInput } from '../../../dtos/itemCart.dto';

export class MockItemCart implements ItemCartCrud {
  private itemCarts: ItemCart[] = [];
  private idCounter = 1;

  /* constructor() {
    this.itemCarts = [
      new ItemCart(this.idCounter++, 1, 1, 4),
      new ItemCart(this.idCounter++, 2, 2, 2),
    ];
  } */

  constructor() {
    // Items para cada carrito
    this.itemCarts.push(new ItemCart(this.idCounter++, 1, 1, 2)); // carrito 1, producto 1
    this.itemCarts.push(new ItemCart(this.idCounter++, 1, 2, 1)); // carrito 1, producto 2
    this.itemCarts.push(new ItemCart(this.idCounter++, 2, 2, 3)); // carrito 2, producto 2
    this.itemCarts.push(new ItemCart(this.idCounter++, 2, 1, 1)); // carrito 2, producto 1
    this.itemCarts.push(new ItemCart(this.idCounter++, 3, 1, 4)); // carrito 3
    this.itemCarts.push(new ItemCart(this.idCounter++, 4, 2, 2)); // carrito 4
    this.itemCarts.push(new ItemCart(this.idCounter++, 5, 1, 1)); // carrito 5
    this.itemCarts.push(new ItemCart(this.idCounter++, 6, 2, 5)); // carrito 6
    this.itemCarts.push(new ItemCart(this.idCounter++, 7, 1, 2)); // carrito 7
    this.itemCarts.push(new ItemCart(this.idCounter++, 8, 2, 3)); // carrito 8
    this.itemCarts.push(new ItemCart(this.idCounter++, 9, 1, 1)); // carrito 9
    this.itemCarts.push(new ItemCart(this.idCounter++, 10, 2, 2)); // carrito 10
    this.itemCarts.push(new ItemCart(this.idCounter++, 11, 1, 3)); // carrito 11
    this.itemCarts.push(new ItemCart(this.idCounter++, 12, 2, 1)); // carrito 12
  }

  getAll(): Promise<ItemCart[]> {
    return new Promise((resolve) => {
      resolve(this.itemCarts);
    });
  }

  getByItemId(itemId: number): Promise<ItemCart | undefined> {
    return new Promise((resolve) => {
      const item = this.itemCarts.find((ic) => ic.getItemId() === itemId);
      resolve(item); // undefined si no existe
    });
  }

  getByCartId(cartId: number): Promise<ItemCart[]> {
    return new Promise((resolve) => {
      const items = this.itemCarts.filter((ic) => ic.getCartId() === cartId);
      resolve(items); // [] si no hay
    });
  }

  getByProductId(productId: number): Promise<ItemCart[]> {
    return new Promise((resolve) => {
      const items = this.itemCarts.filter((ic) => ic.getProductId() === productId);
      resolve(items); // [] si no hay
    });
  }

  create(data: ItemCartInput): Promise<ItemCart> {
    return new Promise((resolve) => {
      const newItem = new ItemCart(this.idCounter++, data.cart_id, data.product_id, data.quantity);
      this.itemCarts.push(newItem);
      resolve(newItem);
    });
  }

  delete(itemId: number): Promise<boolean> {
    return new Promise((resolve) => {
      const initialLength = this.itemCarts.length;
      this.itemCarts = this.itemCarts.filter((ic) => ic.getItemId() !== itemId);
      resolve(this.itemCarts.length < initialLength); // true si eliminó algo
    });
  }

  clearByCartId(cartId: number): Promise<void> {
    return new Promise((resolve) => {
      this.itemCarts = this.itemCarts.filter((ic) => ic.getCartId() !== cartId);
      resolve();
    });
  }
}

export default new MockItemCart();
