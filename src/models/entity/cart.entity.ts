export class Cart {
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

  //setters
  public setCartId(newCartId: number) {
    this.cart_id = newCartId;
  }

  public setUserId(newUserId: number) {
    this.user_id = newUserId;
  }
}
