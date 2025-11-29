export class ItemCart {
  constructor(
    private item_id: number, // para la base de datos o mock: ID único global del ítem (clave primaria)
    private cart_id: number,
    private product_id: number,
    private quantity: number,
    private unit_price?: number, // opcional, se puede setear luego
  ) {}
  // getters
  public getCartId(): number {
    return this.cart_id;
  }
  public getItemId() {
    return this.item_id;
  }
  public getProductId(): number {
    return this.product_id;
  }
  public getQuantity(): number {
    return this.quantity;
  }
  public getUnitPrice(): number | undefined {
    return this.unit_price;
  }

  // setters
  public setItemId(newItemId: number) {
    if (newItemId <= 0) {
      throw new Error(`Item id cant be lower or equal than 0`);
    }
    this.item_id = newItemId;
  }
  public setCartId(newCartId: number) {
    if (newCartId <= 0) {
      throw new Error(`Cart id cant be lower or equal than 0`);
    }
    this.cart_id = newCartId;
  }
  public setProductId(newProductId: number): void {
    if (newProductId <= 0) {
      throw new Error(`Product id cant be lower or equal than 0`);
    }
    this.product_id = newProductId;
  }
  public setQuantity(newQuantity: number): void {
    if (newQuantity <= 0) {
      throw new Error(`Quantity must be greater than 0`);
    }
    this.quantity = newQuantity;
  }

  public setUnitPrice(newPrice: number): void {
    if (newPrice < 0) throw new Error('Unit price cannot be negative');
    this.unit_price = newPrice;
  }

  // con item_id y car_it
  public toJSON() {
    return {
      item_id: this.item_id,
      cart_id: this.cart_id,
      product_id: this.product_id,
      quantity: this.quantity,
      unit_price: this.unit_price,
    };
  }
}
