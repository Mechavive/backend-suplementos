import { ItemCart } from '../../entity/itemCart.entity';
import { ItemCartCrud } from '../../crud/itemCartCrud.interface';
import { ItemCartInput } from '../../../dtos/itemCart.dto';

export class MockItemCart implements ItemCartCrud {
  private itemCarts: ItemCart[] = [];
  private idCounter = 1;

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
