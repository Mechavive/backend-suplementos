import { Cart } from '../../models/entity/cart.entity';
import cartService from '../../services/cart.service';
import { CartInput } from '../../dtos/cart.dto';

describe('Cart Service - Unit Tests', () => {
  let createdCart: Cart;

  const sampleCart: CartInput = {
    user_id: 3,
  };

  beforeAll(async () => {
    createdCart = await cartService.create(sampleCart);
  });

  it('should create a new cart', async () => {
    //console.log('Created Cart:', createdCart);
    expect(createdCart).toHaveProperty('cart_id');
    expect(createdCart).toHaveProperty('user_id');
  });

  it('should return all carts', async () => {
    const all = await cartService.getAll();
    //console.log('All carts:', all);
    expect(all.length).toBeGreaterThan(0);
  });

  it('should get cart by cart ID', async () => {
    const cart = await cartService.getById(3);
    //console.log(`carts for cart_id=${3}:`, cart);
    expect(cart?.getCartId()).toBe(3);
  });

  it('should get cart by user ID', async () => {
    const cart = await cartService.getCartByUserId(sampleCart.user_id);
    //console.log(`cart for user_id=${sampleCart.user_id}:`, cart);
    expect(cart?.getUserId()).toBe(sampleCart.user_id);
  });

  it('should delete an order detail', async () => {
    const id = createdCart.getCartId();

    await cartService.delete(id);
    const all = await cartService.getAll();

    const found = all.find((o) => o.getCartId() === id);
    expect(found).toBeUndefined();
  });
});
