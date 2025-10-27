export class Product {
  constructor(
    private _product_id: number,
    private _name: string,
    private _price: number,
    private _image: string,
    private _category_id: number,
    private _stock: number,
    private _rating: number,
    private _brand: string,
    private _description: string,
  ) {}

  // Getters
  public get product_id(): number {
    return this._product_id;
  }

  public get name(): string {
    return this._name;
  }

  public get price(): number {
    return this._price;
  }

  public get image(): string {
    return this._image;
  }

  public get category_id(): number {
    return this._category_id;
  }

  public get stock(): number {
    return this._stock;
  }

  public get rating(): number {
    return this._rating;
  }

  public get brand(): string {
    return this._brand;
  }

  public get description(): string {
    return this._description;
  }

  // Setters simples (sin validación)
  public set name(value: string) {
    this._name = value;
  }

  public set price(value: number) {
    this._price = value;
  }

  public set stock(value: number) {
    this._stock = value;
  }

  public set rating(value: number) {
    this._rating = value;
  }

  public set description(value: string) {
    this._description = value;
  }

  public set image(value: string) {
    this._image = value;
  }

  public set category_id(value: number) {
    this._category_id = value;
  }

  public set brand(value: string) {
    this._brand = value;
  }

  // para aplicar cambios de manera centralizada
  public updateFromPartial(data: Partial<Omit<Product, 'product_id'>>) {
    Object.entries(data).forEach(([key, value]) => {
      if (value === undefined) return;
      if (key in this && typeof (this as any)[key] !== 'function') {
        (this as any)[key] = value;
      }
    });
  }

  // Conversión a objeto plano
  public toJSON() {
    return {
      product_id: this._product_id,
      name: this._name,
      price: this._price,
      image: this._image,
      category_id: this._category_id,
      stock: this._stock,
      rating: this._rating,
      brand: this._brand,
      description: this._description,
    };
  }
}
