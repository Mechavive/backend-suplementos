// models/entity/review.entity.ts
export class Review {
  constructor(
    private _review_id: number,
    private _user_id: number,
    private _product_id: number,
    private _qualification: number,
    private _comment: string,
    private _date: Date,
  ) {}

  // Getters
  public get review_id(): number {
    return this._review_id;
  }

  public get user_id(): number {
    return this._user_id;
  }

  public get product_id(): number {
    return this._product_id;
  }

  public get qualification(): number {
    return this._qualification;
  }

  public get comment(): string {
    return this._comment;
  }

  public get date(): Date {
    return this._date;
  }

  // Setters simples
  public set qualification(value: number) {
    this._qualification = value;
  }

  public set comment(value: string) {
    this._comment = value;
  }

  public set date(value: Date) {
    this._date = value;
  }

  // Convertir a objeto plano
  public toJSON() {
    return {
      review_id: this._review_id,
      user_id: this._user_id,
      product_id: this._product_id,
      qualification: this._qualification,
      comment: this._comment,
      date: this._date,
    };
  }
}
