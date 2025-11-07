export class OrderDetail {
  private subtotal: number;
  constructor(
    private order_detail_id: number,
    private order_id: number,
    private product_id: number,
    private quantity: number,
    private unit_price: number,
  ) {
    this.subtotal = this.quantity * this.unit_price;
  }

  //Getters
  public getOrderDetailId(): number {
    return this.order_detail_id;
  }

  public getOrderId(): number {
    return this.order_id;
  }

  public getProductId(): number {
    return this.product_id;
  }

  public getQuantity(): number {
    return this.quantity;
  }

  public getUnitPrice(): number {
    return this.unit_price;
  }

  public getSubtotal(): number {
    return this.subtotal;
  }

  //Setters
  public setOrderDetailId(id: number) {
    if (id <= 0) {
      throw new Error('Id cant be lower than 0');
    }
    this.order_detail_id = id;
  }

  public setQuantity(newQuant: number) {
    if (newQuant <= 0) {
      throw new Error('Quantity can not be 0');
    }
    this.quantity = newQuant;
  }

  public setUnitPrice(newUnitPrice: number) {
    if (newUnitPrice < 0) {
      throw new Error('Price can not be negative');
    }
    this.unit_price = newUnitPrice;
  }
}
