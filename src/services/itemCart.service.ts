import { ItemCartInput } from "../dtos/itemCart.dto";
import { ItemCart } from "../models/entity/itemCart.entity";
import  MockItemCartModel from "../models/implementations/mock/mockItemCart";

class ItemCartService {
    async getAll(): Promise<ItemCart[]> {
        return MockItemCartModel.getAll();
    };
    async getByItemId(itemId: number): Promise<ItemCart | undefined> {
        return MockItemCartModel.getByItemId(itemId)
    };
    async getByCartId(cartId: number): Promise<ItemCart | undefined> {
        return MockItemCartModel.getByCartId(cartId)
    };
    async getByProductId(productId: number): Promise<ItemCart | undefined> {
        return MockItemCartModel.getByProductId(productId)
    };
    async create(itemC: ItemCartInput): Promise<ItemCart> {
        return MockItemCartModel.create(itemC)
    };
    async delete(itemId: number): Promise<void> {
        return MockItemCartModel.delete(itemId)
    }
}

export default new ItemCartService()