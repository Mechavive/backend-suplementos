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
}
