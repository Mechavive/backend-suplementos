export class ItemCart {
  constructor(
    private item_id: number,
    private cart_id: number,
    private product_id: number,
    private quantity: number,
  ) {}
  // getters
  public getItemId() {
    return this.item_id;
  }
  public getCartId() {
    return this.cart_id;
  }
  public getProductId() {
    return this.product_id;
  }
  public getQuantity() {
    return this.quantity;
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
  public setProductId(newProductId: number) {
    if (newProductId <= 0) {
      throw new Error(`Product id cant be lower or equal than 0`);
    }
    this.product_id = newProductId;
  }
  public setQuantity(newQuantity: number) {
    if (newQuantity <= 0) {
      throw new Error(`Quantity cant be lower or equal than 0`);
    }
    this.quantity = newQuantity;
  }
}
