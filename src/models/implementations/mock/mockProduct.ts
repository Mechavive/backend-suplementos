// models/implementations/mock/mockProduct.ts
import { Product } from '../../entity/product.entity';
import { ProductCrud } from '../../crud/productCrud.interface';
import { ProductUpdate, ProductInput } from '../../../dtos/product.dto';

export class MockProduct implements ProductCrud {
  private products: Product[] = [];
  private idCounter = 1;

  constructor() {
    this.products = [
      // Proteínas
      new Product(
        this.idCounter++, // product_id
        'Proteína Whey', // name
        15000, // price
        '/images/products/Proteina-Whey.webp', // image
        1, // Proteína    // category_id
        10, // stock
        4.5, // rating
        'Optimum', // brand
        'Proteína en polvo para aumentar masa muscular.', // description
      ),
      new Product(
        this.idCounter++,
        'Proteína Vegetal',
        18000,
        '/images/products/Proteina-Vegetal.webp', // en el backend http://localhost:3000/images/products/Proteina-Vegetal.webp
        1, // Proteína
        15,
        4.2,
        'VeganPro',
        'Proteína vegetal en polvo para complementar tu dieta.',
      ),

      // Creatina
      new Product(
        this.idCounter++,
        'Creatina Monohidratada',
        8000,
        '/images/products/Creatina-Monohidratada.webp',
        2, // Creatina
        20,
        4.8,
        'MyProtein',
        'Creatina monohidratada pura para mejorar fuerza y resistencia.',
      ),
      new Product(
        this.idCounter++,
        'Creatina Micronizada',
        9000,
        '/images/products/Creatina-Micronizada.webp',
        2, // Creatina
        12,
        4.7,
        'Universal',
        'Creatina micronizada para mejor absorción.',
      ),

      // Aminoácidos
      new Product(
        this.idCounter++,
        'BCAA_211',
        12000,
        '/images/products/BCAA-211.webp',
        3, // Aminoácidos
        25,
        4.6,
        'Scivation',
        'Aminoácidos ramificados para recuperación y síntesis proteica.',
      ),

      // Pre-entreno
      new Product(
        this.idCounter++,
        'Pre-entreno Hardcore',
        14000,
        '/images/products/Preentreno-Hardcore.webp',
        4, // Pre-entreno
        18,
        4.4,
        'Cellucor',
        'Mejora tu energía y concentración antes de entrenar.',
      ),

      // Vitaminas y Minerales
      new Product(
        this.idCounter++,
        'Multivitamínico Daily',
        7000,
        '/images/products/Multivitaminico-Daily.webp',
        5, // Vitaminas y Minerales
        30,
        4.3,
        'Now Foods',
        'Suplemento multivitamínico para salud general.',
      ),

      // Quemadores de grasa
      new Product(
        this.idCounter++,
        'L-Carnitina',
        9000,
        '/images/products/L-Carnitina.webp',
        6, // Quemadores de grasa
        20,
        4.1,
        'Nutrex',
        'Apoya el metabolismo de grasas durante el ejercicio.',
      ),

      // Hidratación y electrolitos
      new Product(
        this.idCounter++,
        'Electrolitos en Polvo',
        6000,
        '/images/products/Electrolitos-en-Polvo.webp',
        7, // Hidratación y electrolitos
        25,
        4.5,
        'HydroMax',
        'Bebida en polvo para reponer sales y mantener hidratación.',
      ),

      // Snacks y barras
      new Product(
        this.idCounter++,
        'Barra Proteica Chocolate',
        3500,
        '/images/products/Barra-Proteica-Chocolate.webp',
        8, // Snacks y barras
        40,
        4.6,
        'Quest',
        'Barras de proteína ideales para un snack rápido.',
      ),

      // Omega y ácidos grasos
      new Product(
        this.idCounter++,
        'Omega 3 1000mg',
        11000,
        '/images/products/Omega-3-1000mg.webp',
        9, // Omega y ácidos grasos
        22,
        4.7,
        'Nordic Naturals',
        'Ácidos grasos esenciales para salud cardiovascular y articular.',
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
    const image = data.image || '/images/products/product-placeholder.webp';
    const newProduct = new Product(
      this.idCounter++,
      data.name,
      data.price,
      image,
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
