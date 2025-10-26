// models/implementations/mock/mockProduct.ts
import { Product } from '../../entity/product.entity';
import { ProductCrud } from '../../crud/productCrud.interface';
import { ProductUpdate, ProductInput } from '../../../dtos/product.dto';

export class MockProduct implements ProductCrud {
  private products: Product[] = [];
  private idCounter = 1;

  constructor() {
    // Datos iniciales simulados como instancias de Product
    this.products = [
      new Product(
        this.idCounter++, // product_id
        'Proteína Whey', // name
        15000, // price
        'whey.jpg', // image
        1, // category_id
        10, // stock
        4.5, // rating
        'Optimum', // brand
        'Proteína en polvo para aumentar masa muscular.', // description
      ),
      new Product(
        this.idCounter++,
        'Creatina',
        8000,
        'creatina.jpg',
        1,
        20,
        4.8,
        'MyProtein',
        'Creatina monohidratada pura.',
      ),
    ];
  }

  async getAll(): Promise<Product[]> {
    return this.products;
  }

  async getById(id: number): Promise<Product | undefined> {
    return this.products.find((p) => p.product_id === id);
  }

  async create(data: ProductInput): Promise<Product> {
    const newProduct = new Product(
      this.idCounter++,
      data.name,
      data.price,
      data.image,
      data.category_id,
      data.stock,
      data.rating,
      data.brand,
      data.description,
    );
    this.products.push(newProduct);
    return newProduct;
  }

  async update(id: number, data: ProductUpdate): Promise<Product | undefined> {
    const product = this.products.find((p) => p.product_id === id);
    if (!product) return undefined;

    product.updateFromPartial(data); // método dentro de la entidad
    return product;
  }

  async delete(id: number): Promise<boolean> {
    const originalLength = this.products.length;
    this.products = this.products.filter((p) => p.product_id !== id);
    return this.products.length < originalLength;
  }

  clear(): void {
    this.products = [];
    this.idCounter = 1;
  }
}

export default new MockProduct();
