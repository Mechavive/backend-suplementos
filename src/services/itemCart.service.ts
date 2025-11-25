import { ItemCartInput } from '../dtos/itemCart.dto';
import { ItemCart } from '../models/entity/itemCart.entity';
import MockItemCart from '../models/implementations/mock/mockItemCart';
import ProductService from './product.service';

class ItemCartService {
  async getAll(): Promise<ItemCart[]> {
    return MockItemCart.getAll();
  }

  async getByItemId(itemId: number): Promise<ItemCart | undefined> {
    return MockItemCart.getByItemId(itemId);
  }

  async getByCartId(cartId: number): Promise<ItemCart[]> {
    return MockItemCart.getByCartId(cartId);
  }

  async getByProductId(productId: number): Promise<ItemCart[]> {
    return MockItemCart.getByProductId(productId);
  }

  async create(itemC: ItemCartInput): Promise<ItemCart> {
    const product = await ProductService.getById(itemC.product_id);
    if (!product) throw new Error(`Producto con id ${itemC.product_id} no existe`);

    return MockItemCart.create(itemC);
  }

  async delete(itemId: number): Promise<void> {
    const deleted = await MockItemCart.delete(itemId);
    if (!deleted) throw new Error(`Item carrito con id ${itemId} no existe`);
  }

  async clearByCartId(cartId: number): Promise<void> {
    await MockItemCart.clearByCartId(cartId);
  }
}

export default new ItemCartService();
