// models/interface/review.ts
/* 
export interface Review {
  review_id: number;
  user_id: number;
  product_id: number;
  qualification: number; // 1 to 5
  comment: string;
  date: Date;
} */

// models/entity/review.entity.ts
export class Review {
  constructor(
    private _review_id: number,
    private _user_id: number,
    private _product_id: number,
    private _qualification: number,
    private _comment: string,
    private _date: Date,
  ) {
    this.validateQualification(_qualification);
  }

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

  // Setters con validación
  public set qualification(value: number) {
    this.validateQualification(value);
    this._qualification = value;
  }

  public set comment(value: string) {
    if (!value || value.trim().length < 3) {
      throw new Error('El comentario debe tener al menos 3 caracteres.');
    }
    this._comment = value;
  }

  // Validaciones internas
  private validateQualification(value: number): void {
    if (value < 1 || value > 5) {
      throw new Error('La calificación debe ser un número entre 1 y 5.');
    }
  }

  // Método auxiliar para devolver un objeto plano (para JSON o BD)
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
