import { CategoryInput } from '../dtos/category.dto';
import { Category } from '../models/entity/category.entity';
import MockCategory from '../models/implementations/mock/mockCategory';

export class CategoryService {
  async getAll(): Promise<Category[]> {
    return MockCategory.getAll();
  }

  // async getById(id: number): Promise<Category | undefined> {
  //   return MockCategory.getById(id);
  // }

  async getById(id: number): Promise<Category> {
    const category = await MockCategory.getById(id);
    if (!category) {
      throw new Error(`La categoría con id ${id} no existe`);
    }
    return category;
  }

  // async create(data: CategoryInput): Promise<Category> {
  //   return MockCategory.create(data);
  // }

  async create(data: Omit<CategoryInput, 'category_id'>): Promise<Category> {
    return MockCategory.create(data);
  }

  async update(id: number, data: Partial<CategoryInput>): Promise<Category | undefined> {
    const updated = await MockCategory.update(id, data);
    if (!updated) throw new Error(`La categoría con id ${id} no existe`);
    return updated;
  }

  async delete(id: number): Promise<void> {
    const deleted = await MockCategory.delete(id);
    if (!deleted) throw new Error(`La categoría con id ${id} no existe`);
  }

  // async delete(id: number): Promise<void> {
  //   return MockCategory.delete(id);
  // }

  /* async delete(id: number): Promise<void> {
  const deleted = await MockCategory.delete(id);
  if (!deleted) {
    throw new Error(`La categoría con id ${id} no existe`);
  }
}


  async update(id: number, data: CategoryInput): Promise<Category | undefined> {
  return MockCategory.update(id, data);
} */
}

export default new CategoryService();
