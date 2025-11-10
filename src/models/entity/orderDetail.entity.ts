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
    this.subtotal = this.quantity * this.unit_price; // recalcular el subtotal
  }

  public setUnitPrice(newUnitPrice: number) {
    if (newUnitPrice < 0) {
      throw new Error('Price can not be negative');
    }
    this.unit_price = newUnitPrice;
    this.subtotal = this.quantity * this.unit_price; // recalcular el subtotal
  }

  // para el checkout service
  public setOrderId(orderId: number) {
    if (orderId <= 0) {
      throw new Error('Order ID must be greater than 0');
    }
    this.order_id = orderId;
  }

  public toJSON() {
    return {
      order_detail_id: this.order_detail_id,
      order_id: this.order_id,
      product_id: this.product_id,
      quantity: this.quantity,
      unit_price: this.unit_price,
      subtotal: this.subtotal,
    };
  }
}
