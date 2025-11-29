// src/models/entity/cart.entity.ts
import { ItemCart } from './itemCart.entity';

export class Cart {
  private items: ItemCart[] = []; // productos del carrito

  constructor(
    private cart_id: number,
    private user_id: number,
  ) {}

  //getters
  public getCartId(): number {
    return this.cart_id;
  }

  public getUserId(): number {
    return this.user_id;
  }

  public getItems(): ItemCart[] {
    return this.items;
  }

  //setters
  public setCartId(newCartId: number) {
    if (newCartId <= 0) {
      throw new Error('Id cant be lower or equal than 0');
    }
    this.cart_id = newCartId;
  }

  public setUserId(newUserId: number) {
    if (newUserId <= 0) {
      throw new Error('Id cant be lower or equal than 0');
    }
    this.user_id = newUserId;
  }

  // para que el carrito refleje el último precio del producto
  public addItem(item: ItemCart): void {
    const existing = this.items.find((i) => i.getProductId() === item.getProductId());
    if (existing) {
      existing.setQuantity(existing.getQuantity() + item.getQuantity());
      if (item.getUnitPrice() !== undefined) {
        existing.setUnitPrice(item.getUnitPrice()!);
      }
    } else {
      this.items.push(item);
    }
  }

  public removeItem(productId: number): void {
    this.items = this.items.filter((i) => i.getProductId() !== productId);
  }

  public clear(): void {
    this.items = [];
  }

  public toJSON() {
    return {
      cart_id: this.cart_id,
      user_id: this.user_id,
      items: this.items.map((i) => i.toJSON()),
    };
  }
}
