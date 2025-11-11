import { ItemCart } from '../../entity/itemCart.entity';
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

export default new MockItemCart();
