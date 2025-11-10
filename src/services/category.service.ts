import { CategoryInput } from '../dtos/category.dto';
import { Category } from '../models/entity/category.entity';
import MockCategory from '../models/implementations/mock/mockCategory';

export class CategoryService {
  async getAll(): Promise<Category[]> {
    return MockCategory.getAll();
  }

  async getById(id: number): Promise<Category | undefined> {
    return MockCategory.getById(id);
  }

  async create(data: CategoryInput): Promise<Category> {
    return MockCategory.create(data);
  }

  async delete(id: number): Promise<void> {
    return MockCategory.delete(id);
  }
}

export default new CategoryService();
