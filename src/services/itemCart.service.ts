/* import { ItemCartInput } from '../dtos/itemCart.dto';
import { ItemCart } from '../models/entity/itemCart.entity';
import MockItemCartModel from '../models/implementations/mock/mockItemCart';

class ItemCartService {
  async getAll(): Promise<ItemCart[]> {
    return MockItemCartModel.getAll();
  }
  async getByItemId(itemId: number): Promise<ItemCart | undefined> {
    return MockItemCartModel.getByItemId(itemId);
  }
  async getByCartId(cartId: number): Promise<ItemCart | undefined> {
    return MockItemCartModel.getByCartId(cartId);
  }
  async getByProductId(productId: number): Promise<ItemCart | undefined> {
    return MockItemCartModel.getByProductId(productId);
  }
  async create(itemC: ItemCartInput): Promise<ItemCart> {
    return MockItemCartModel.create(itemC);
  }
  async delete(itemId: number): Promise<void> {
    return MockItemCartModel.delete(itemId);
  }
}

export default new ItemCartService(); */

/* import { ItemCartInput } from '../dtos/itemCart.dto';
import { ItemCart } from '../models/entity/itemCart.entity';
import MockItemCartModel from '../models/implementations/mock/mockItemCart';

import productService from './product.service';

class ItemCartService {
  // Devuelve todos los items de todos los carritos
  async getAll(): Promise<ItemCart[]> {
    return MockItemCartModel.getAll();
  }

  // Devuelve un solo item por su ID
  // async getByItemId(itemId: number): Promise<ItemCart> {
  //   return MockItemCartModel.getByItemId(itemId);
  // }

  // uso el undefined para el checkout de order
  async getByItemId(itemId: number): Promise<ItemCart | undefined> {
    return MockItemCartModel.getByItemId(itemId);
  }

  // Devuelve todos los items de un carrito
  async getByCartId(cartId: number): Promise<ItemCart[]> {
    return MockItemCartModel.getByCartId(cartId);
  }

  // Devuelve todos los items que corresponden a un producto
  async getByProductId(productId: number): Promise<ItemCart[]> {
    return MockItemCartModel.getByProductId(productId);
  }

  // Crea un nuevo item en el carrito
  // async create(itemC: ItemCartInput): Promise<ItemCart> {
  //   return MockItemCartModel.create(itemC);
  // }

  async create(itemC: ItemCartInput): Promise<ItemCart> {
    // verificar que el product_id exista
    const product = await productService.getById(itemC.product_id);
    if (!product) {
      throw new Error(`Producto con id ${itemC.product_id} no existe`);
    }

    return MockItemCartModel.create(itemC);
  }

  // Elimina un item por su ID
  async delete(itemId: number): Promise<void> {
    return MockItemCartModel.delete(itemId);
  }
}

export default new ItemCartService(); */

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
