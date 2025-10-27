// tests/unit/order.service.spec.ts

import OrderService from '../../services/order.service';
import OrderModel from '../../models/implementations/mock/mockOrder';
import ProductService from '../../services/product.service';
import UserService from '../../services/user.service';
import { OrderInput } from '../../dtos/order.dto';
import { Order } from '../../models/entity/order.entity';
import { jest } from '@jest/globals';

describe('OrderService Unit Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('debería crear una orden si el usuario existe y hay stock', async () => {
      // Mock de usuario existente
      jest.spyOn(UserService, 'getById').mockResolvedValue({ user_id: 1, name: 'Juan' } as any);

      // Mock de decreaseStock para que siempre funcione
      jest.spyOn(ProductService, 'decreaseStock').mockResolvedValue({ stock: 10 } as any);

      // Mock de la creación en OrderModel
      const orderModelCreateSpy = jest
        .spyOn(OrderModel, 'create')
        .mockImplementation(async (data: OrderInput) => {
          return new Order(1, data.user_id, 'pending', data.total, new Date());
        });

      const input: OrderInput = {
        user_id: 1,
        total: 150,
        items: [{ productId: 1, quantity: 2 }],
      };

      const result = await OrderService.create(input);

      expect(UserService.getById).toHaveBeenCalledWith(1);
      expect(ProductService.decreaseStock).toHaveBeenCalledWith(1, 2);
      expect(orderModelCreateSpy).toHaveBeenCalledWith(input);
      expect(result).toBeInstanceOf(Order);
      expect(result.total).toBe(150);
      expect(result.status).toBe('pending');
    });

    it('debería lanzar error si el usuario no existe', async () => {
      jest.spyOn(UserService, 'getById').mockResolvedValue(undefined);

      const input: OrderInput = {
        user_id: 999,
        total: 100,
        items: [],
      };

      await expect(OrderService.create(input)).rejects.toThrow('Usuario no existe');
    });
  });

  describe('updateStatus', () => {
    it('debería actualizar el estado de una orden existente', async () => {
      const mockOrder = new Order(1, 1, 'pending', 200, new Date());
      jest.spyOn(OrderModel, 'updateStatus').mockResolvedValue(mockOrder);

      const result = await OrderService.updateStatus(1, 'paid');

      expect(OrderModel.updateStatus).toHaveBeenCalledWith(1, 'paid');
      expect(result).toBe(mockOrder);
    });

    it('debería retornar undefined si la orden no existe', async () => {
      jest.spyOn(OrderModel, 'updateStatus').mockResolvedValue(undefined);

      const result = await OrderService.updateStatus(999, 'paid');

      expect(OrderModel.updateStatus).toHaveBeenCalledWith(999, 'paid');
      expect(result).toBeUndefined();
    });
  });

  describe('delete', () => {
    it('debería eliminar una orden existente', async () => {
      jest.spyOn(OrderModel, 'delete').mockResolvedValue(true);

      const result = await OrderService.delete(1);

      expect(OrderModel.delete).toHaveBeenCalledWith(1);
      expect(result).toBe(true);
    });

    it('debería retornar false si la orden no existe', async () => {
      jest.spyOn(OrderModel, 'delete').mockResolvedValue(false);

      const result = await OrderService.delete(999);

      expect(OrderModel.delete).toHaveBeenCalledWith(999);
      expect(result).toBe(false);
    });
  });
});
