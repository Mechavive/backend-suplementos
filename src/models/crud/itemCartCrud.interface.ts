import { ItemCartInput } from '../../dtos/itemCart.dto';
import { ItemCart } from '../entity/itemCart.entity';

export interface ItemCartCrud {
  getAll(): Promise<ItemCart[]>;
  getByItemId(itemId: number): Promise<ItemCart | undefined>;
  getByCartId(cartId: number): Promise<ItemCart | undefined>;
  getByProductId(productId: number): Promise<ItemCart | undefined>;
  create(itemC: ItemCartInput): Promise<ItemCart>;
  delete(itemId: number): Promise<void>;
}
