import { Cart } from '../../models/entity/cart.entity';
import cartService from '../../services/cart.service';

describe('Cart Service - Unit Tests', () => {
  let createdCart: Cart;

  const sampleCart = new Cart(1, 1);

  beforeAll(async () => {
    createdCart = await cartService.create(sampleCart);
  });

  it('should create a new cart', async () => {
    console.log('Created Cart:', createdCart);
    expect(createdCart).toHaveProperty('cart_id');
    expect(createdCart).toHaveProperty('user_id');
  });

  it('should return all carts', async () => {
    const all = await cartService.getAll();
    console.log('All carts:', all);
    expect(all.length).toBeGreaterThan(0);
  });

  it('should get cart by cart ID', async () => {
    const cart = await cartService.getById(sampleCart.getCartId());
    console.log(`carts for cart_id=${sampleCart.getCartId()}:`, cart);
    expect(cart?.getCartId()).toBe(sampleCart.getCartId());
  });

  it('should get cart by user ID', async () => {
    const cart = await cartService.getCartByUserId(sampleCart.getUserId());
    console.log(`cart for user_id=${sampleCart.getUserId()}:`, cart);
    expect(cart?.getUserId()).toBe(sampleCart.getUserId());
  });

  it('should delete an order detail', async () => {
    const id = createdCart.getCartId();

    await cartService.delete(id);
    const all = await cartService.getAll();

    const found = all.find((o) => o.getCartId() === id);
    expect(found).toBeUndefined();
  });
});
