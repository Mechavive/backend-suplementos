// src/services/itemCart.service.test.ts
import ItemCartService from '../../services/itemCart.service';
import MockItemCart from '../../models/implementations/mock/mockItemCart';
import ProductService from '../../services/product.service';
import { ItemCart } from '../../models/entity/itemCart.entity';
import { ItemCartInput } from '../../dtos/itemCart.dto';

jest.mock('../../models/implementations/mock/mockItemCart');
jest.mock('../../services/product.service');

describe('ItemCart Service - Unit Tests', () => {
  const sampleItem: ItemCart = new ItemCart(
    1, // item_id
    1, // cart_id
    2, // product_id
    3, // quantity
  );

  const sampleInput: ItemCartInput = {
    cart_id: 1,
    product_id: 2,
    quantity: 3,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // CREATE
  it('debería crear un nuevo item en el carrito', async () => {
    // Mockear que el producto existe
    (ProductService.getById as jest.Mock).mockResolvedValue({ product_id: 2 });

    // Mockear creación
    (MockItemCart.create as jest.Mock).mockResolvedValue(sampleItem);

    const created = await ItemCartService.create(sampleInput);

    expect(created).toBe(sampleItem);
    expect(MockItemCart.create).toHaveBeenCalledWith(sampleInput);
  });

  it('debería lanzar error si se intenta crear un item con un product_id inexistente', async () => {
    (ProductService.getById as jest.Mock).mockResolvedValueOnce(undefined);

    await expect(ItemCartService.create(sampleInput)).rejects.toThrow(
      `Producto con id ${sampleInput.product_id} no existe`,
    );
  });

  // GET
  it('debería obtener todos los items', async () => {
    (MockItemCart.getAll as jest.Mock).mockResolvedValue([sampleItem]);

    const items = await ItemCartService.getAll();

    expect(items.length).toBeGreaterThan(0);
    expect(items[0]).toBe(sampleItem);
  });

  it('debería obtener un item por item_id', async () => {
    (MockItemCart.getByItemId as jest.Mock).mockResolvedValue(sampleItem);

    const item = await ItemCartService.getByItemId(1);

    expect(item).toBe(sampleItem);
  });

  it('debería obtener items por cart_id', async () => {
    (MockItemCart.getByCartId as jest.Mock).mockResolvedValue([sampleItem]);

    const items = await ItemCartService.getByCartId(1);

    expect(items.length).toBe(1);
    expect(items[0]!.getCartId()).toBe(1);
  });

  it('debería obtener items por product_id', async () => {
    (MockItemCart.getByProductId as jest.Mock).mockResolvedValue([sampleItem]);

    const items = await ItemCartService.getByProductId(2);

    expect(items.length).toBe(1);
    expect(items[0]!.getProductId()).toBe(2);
  });

  // DELETE
  it('debería eliminar un item correctamente', async () => {
    (MockItemCart.delete as jest.Mock).mockResolvedValue(true);

    await expect(ItemCartService.delete(1)).resolves.not.toThrow();
  });

  it('debería lanzar error al intentar eliminar un item inexistente', async () => {
    (MockItemCart.delete as jest.Mock).mockResolvedValue(false);

    await expect(ItemCartService.delete(999)).rejects.toThrow('Item carrito con id 999 no existe');
  });

  // CLEAR BY CART ID
  it('debería limpiar todos los items por cart_id', async () => {
    (MockItemCart.clearByCartId as jest.Mock).mockResolvedValue(undefined);

    await expect(ItemCartService.clearByCartId(1)).resolves.not.toThrow();

    expect(MockItemCart.clearByCartId).toHaveBeenCalledWith(1);
  });
});
