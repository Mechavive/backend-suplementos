export type OrderStatus = 'pending' | 'paid' | 'cancel';

export class Order {
  constructor(
    private _order_id: number,
    private _user_id: number,
    private _status: OrderStatus,
    private _total: number,
    private _order_date: Date,
  ) {}

  // Getters
  public get order_id(): number {
    return this._order_id;
  }

  public get user_id(): number {
    return this._user_id;
  }

  public get status(): OrderStatus {
    return this._status;
  }

  public get total(): number {
    return this._total;
  }

  public get order_date(): Date {
    return this._order_date;
  }

  // Setters simples
  public set status(value: OrderStatus) {
    this._status = value;
  }

  public set total(value: number) {
    this._total = value;
  }

  // Método auxiliar para exportar el objeto plano
  public toJSON() {
    return {
      order_id: this._order_id,
      user_id: this._user_id,
      status: this._status,
      total: this._total,
      order_date: this._order_date,
    };
  }
}
