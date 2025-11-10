import { Category } from '../../models/entity/category.entity';
import { CategoryInput } from '../../dtos/category.dto';
import categoryService from '../../services/category.service';

describe('Category Service - Unit Tests', () => {
  let createdCategory: Category;

  const sampleCategory: CategoryInput = {
    name: 'Proteina',
    description: 'Todos los productos de suplementación proteica',
  };

  beforeAll(async () => {
    createdCategory = await categoryService.create(sampleCategory);
  });

  // para que me de info en consola
  it('should create a new category', async () => {
    expect(createdCategory).toHaveProperty('category_id');
    expect(createdCategory.getName()).toBe(sampleCategory.name);
  });

  it('should return all categories', async () => {
    const all = await categoryService.getAll();
    expect(all.length).toBeGreaterThan(0);
  });

  it('should delete a category', async () => {
    const id = createdCategory.getCategoryId();

    await categoryService.delete(id);
    const all = await categoryService.getAll();

    const found = all.find((o) => o.getCategoryId() === id);
    expect(found).toBeUndefined();
  });
});
