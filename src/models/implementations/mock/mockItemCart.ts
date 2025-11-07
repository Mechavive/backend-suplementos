import { ItemCart } from "../../entity/itemCart.entity";
import { ItemCartCrud } from "../../crud/itemCartCrud.interface";
import { ItemCartInput } from "../../../dtos/itemCart.dto";

export class MockItemCart implements ItemCartCrud {
    private itemCarts: ItemCart[] = []
    private idCounter = 1;
      constructor() {
        this.itemCarts = [new ItemCart(this.idCounter++, 1, 1, 4), new ItemCart(this.idCounter++, 2, 2, 2)];
      }

    getAll(): Promise<ItemCart[]> {
        return new Promise<ItemCart[]>((resolve) => {
            resolve(this.itemCarts)
        });
    }
    getByItemId(itemId: number): Promise<ItemCart | undefined> {
        return new Promise<ItemCart | undefined>((resolve, reject) => {
            const result = this.itemCarts.find((ic: ItemCart) => ic.getItemId() === itemId)
            if (!result) {
                reject(new Error(`ItemCart with id ${itemId} doesn't exist`));
            } else {
                resolve(result);
            }
        });
    }
    getByCartId(cartId: number): Promise<ItemCart | undefined> {
        return new Promise<ItemCart | undefined>((resolve, reject) => {
            const result = this.itemCarts.find((ic: ItemCart) => ic.getCartId() === cartId)
            if (!result) {
                reject(new Error(`ItemCart with cart id ${cartId} doesn't exist`));
            } else {
                resolve(result);
            }
        });
    }
    getByProductId(productId: number): Promise<ItemCart | undefined> {
        return new Promise<ItemCart | undefined>((resolve, reject) => {
            const result = this.itemCarts.find((ic: ItemCart) => ic.getProductId() === productId)
            if (!result) {
                reject(new Error(`ItemCart with cart id ${productId} doesn't exist`));
            } else {
                resolve(result);
            }
        });
    }

    create(data: ItemCartInput): Promise<ItemCart> {
        return new Promise<ItemCart>((resolve)=>{
            const newItemCart = new ItemCart(this.idCounter++, data.cart_id, data.product_id, data.quantity)
            this.itemCarts.push(newItemCart)
            resolve(newItemCart)
        })
    }

    delete(itemId: number): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const index = this.itemCarts.findIndex((ic: ItemCart) => ic.getItemId() === itemId);
            if (index === -1) {
            reject(new Error(`ItemCart with id:${itemId} doesn't exist`));
            } else {
            this.itemCarts.splice(index, 1);
            resolve();
            }
        });
    }
}

export default new MockItemCart()