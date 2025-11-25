import { CategoryInput } from '../../../dtos/category.dto';
import { CategoryCrud } from '../../crud/categoryCrud.interface';
import { Category } from '../../entity/category.entity';

export class MockCategory implements CategoryCrud {
  private Categories: Category[] = [];
  private idCounter: number = 1;

  constructor() {
    this.Categories = [
      new Category(
        this.idCounter++,
        'Proteína',
        'Todos los productos que suplementen necesidades proteicas, como whey, caseína o proteína vegetal.',
      ),
      new Category(
        this.idCounter++,
        'Creatina',
        'Suplementos de creatina para fuerza, energía y recuperación muscular.',
      ),
      new Category(
        this.idCounter++,
        'Aminoácidos',
        'BCAA, EAA y otros aminoácidos esenciales para recuperación y síntesis proteica.',
      ),
      new Category(
        this.idCounter++,
        'Pre-entreno',
        'Suplementos energizantes para mejorar el rendimiento antes de entrenar.',
      ),
      new Category(
        this.idCounter++,
        'Vitaminas y Minerales',
        'Suplementos de micronutrientes para mantener la salud general.',
      ),
      new Category(
        this.idCounter++,
        'Quemadores de grasa',
        'Productos para apoyo en la pérdida de grasa y control de peso.',
      ),
      new Category(
        this.idCounter++,
        'Hidratación y electrolitos',
        'Bebidas, sales y cápsulas para mantener el balance hídrico y electrolítico.',
      ),
      new Category(
        this.idCounter++,
        'Snacks y barras',
        'Barras de proteína, galletas y snacks energéticos para consumo rápido.',
      ),
      new Category(
        this.idCounter++,
        'Omega y ácidos grasos',
        'Suplementos de omega-3, aceite de pescado y otros ácidos grasos esenciales.',
      ),
    ];
  }

  getAll(): Promise<Category[]> {
    return new Promise<Category[]>((resolve) => {
      resolve(this.Categories);
    });
  }

  getById(id: number): Promise<Category | undefined> {
    return new Promise<Category | undefined>((resolve) => {
      const result = this.Categories.find((category) => category.getCategoryId() === id);
      resolve(result); // devuelve undefined si no encuentra nada
    });
  }

  create(data: CategoryInput): Promise<Category> {
    return new Promise<Category>((resolve) => {
      const newCategory = new Category(this.idCounter++, data.name, data.description);
      this.Categories.push(newCategory);
      resolve(newCategory);
    });
  }

  delete(id: number): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      const initialLength = this.Categories.length;
      this.Categories = this.Categories.filter(
        (category: Category) => category.getCategoryId() !== id,
      );

      // Devuelve true si eliminó algo, false si no existía
      resolve(this.Categories.length < initialLength);
    });
  }

  update(id: number, data: Partial<CategoryInput>): Promise<Category | undefined> {
    return new Promise<Category | undefined>((resolve) => {
      const category = this.Categories.find((c) => c.getCategoryId() === id);

      if (!category) {
        resolve(undefined);
        return;
      }

      // Actualizamos solo los campos que vienen en data
      if (data.name !== undefined) category.setName(data.name);
      if (data.description !== undefined) category.setDescription(data.description);

      resolve(category);
    });
  }
}

export default new MockCategory();
