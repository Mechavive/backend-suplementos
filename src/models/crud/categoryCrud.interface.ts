import { CategoryInput } from '../../dtos/category.dto';
import { Category } from '../entity/category.entity';

export interface CategoryCrud {
  getAll(): Promise<Category[]>;
  getById(id: number): Promise<Category | undefined>;
  create(data: CategoryInput): Promise<Category>;
  delete(id: number): Promise<boolean>;
  update(id: number, data: CategoryInput): Promise<Category | undefined>;
}
