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
        'Todos los productos que suplementen necesidades proteicas',
      ),
      new Category(this.idCounter++, 'Creatina', 'Todos los suplementos de Creatina'),
    ];
  }

  getAll(): Promise<Category[]> {
    return new Promise<Category[]>((resolve) => {
      resolve(this.Categories);
    });
  }

  // getById(id: number): Promise<Category | undefined> {
  //   return new Promise<Category | undefined>((resolve, reject) => {
  //     const result = this.Categories.find((category: Category) => category.getCategoryId() === id);

  //     if (!result) {
  //       reject(new Error(`Category with id ${id} doesnt exists`));
  //     } else {
  //       resolve(result);
  //     }
  //   });
  // }

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

  // delete(id: number): Promise<void> {
  //   return new Promise((resolve, reject) => {
  //     const index = this.Categories.findIndex(
  //       (category: Category) => category.getCategoryId() === id,
  //     );

  //     if (index == -1) {
  //       reject(new Error(`Category with id ${id} doesnt exist`));
  //     } else {
  //       this.Categories.splice(index, 1);
  //       resolve();
  //     }
  //   });
  // }

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
