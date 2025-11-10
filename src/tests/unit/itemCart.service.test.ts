import { ItemCart } from '../../models/entity/itemCart.entity';
import itemCartService from '../../services/itemCart.service';
import { ItemCartInput } from '../../dtos/itemCart.dto';

describe('Item Service - Unit Tests', () => {
  let createdItemCart: ItemCart;

  const sampleItemCart: ItemCartInput = {
    cart_id: 1,
    product_id: 3,
    quantity: 5,
  };

  beforeAll(async () => {
    createdItemCart = await itemCartService.create(sampleItemCart);
  });

  it('should create a new cart', async () => {
    //console.log('Created Cart:', createdCart);
    expect(createdItemCart).toHaveProperty('cart_id');
    expect(createdItemCart).toHaveProperty('product_id');
    expect(createdItemCart).toHaveProperty('quantity');
  });

  it('should return all carts', async () => {
    const all = await itemCartService.getAll();
    //console.log('All carts:', all);
    expect(all.length).toBeGreaterThan(0);
  });

  it('should get item cart by item cart ID', async () => {
    const itemCart = await itemCartService.getByItemId(1);
    //console.log(`carts for cart_id=${3}:`, cart);
    expect(itemCart?.getItemId()).toBe(1);
  });

  it('should get item cart by cart ID', async () => {
    const itemCart = await itemCartService.getByCartId(sampleItemCart.cart_id);
    //console.log(`cart for user_id=${sampleCart.user_id}:`, cart);
    expect(itemCart?.getCartId()).toBe(sampleItemCart.cart_id);
  });

  it('should get item cart by product ID', async () => {
    const itemCart = await itemCartService.getByProductId(sampleItemCart.product_id);
    //console.log(`cart for user_id=${sampleCart.user_id}:`, cart);
    expect(itemCart?.getProductId()).toBe(sampleItemCart.product_id);
  });

  it('should delete an item cart', async () => {
    const id = createdItemCart.getCartId();

    await itemCartService.delete(id);
    const all = await itemCartService.getAll();

    const found = all.find((ic) => ic.getCartId() === id);
    expect(found).toBeUndefined();
  });
});
