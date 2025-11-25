// src/services/review.service.ts

import { OrderDetailInput } from '../../dtos/orderDetail.dto';
import { OrderDetail } from '../../models/entity/orderDetail.entity';
import orderDetailService from '../../services/orderDetail.service';

describe('OrderDetail Service - Unit Tests', () => {
  let createdOrderDetail: OrderDetail;

  const sampleOrderDetail: OrderDetailInput = {
    order_id: 1,
    product_id: 2,
    quantity: 1,
    unit_price: 8000,
  };

  beforeAll(async () => {
    createdOrderDetail = await orderDetailService.create(sampleOrderDetail);
  });

  it('should create a new order detail', async () => {
    //console.log('Created OrderDetail:', createdOrderDetail);
    expect(createdOrderDetail).toHaveProperty('order_detail_id');
    expect(createdOrderDetail.getQuantity()).toBe(sampleOrderDetail.quantity);
  });

  it('should return all order details', async () => {
    const all = await orderDetailService.getAll();
    //console.log('All orderDetails:', all);
    expect(all.length).toBeGreaterThan(0);
  });

  it('should get order details by order ID', async () => {
    const ordersdetail = await orderDetailService.getByOrderId(sampleOrderDetail.order_id);
    //console.log(`order details for order_id=${sampleOrderDetail.order_id}:`, ordersdetail);
    expect(ordersdetail.length).toBeGreaterThan(0);
    expect(ordersdetail[0]!.getOrderId()).toBe(sampleOrderDetail.order_id);
  });

  it('should get order details by product ID', async () => {
    const ordersdetail = await orderDetailService.getByProductId(sampleOrderDetail.product_id);
    //console.log(`order details for product_ID=${sampleOrderDetail.product_id}:`, ordersdetail);
    expect(ordersdetail.length).toBeGreaterThan(0);
    expect(ordersdetail[0]!.getProductId()).toBe(sampleOrderDetail.product_id);
  });

  it('should delete an order detail', async () => {
    const id = createdOrderDetail.getOrderDetailId();

    await orderDetailService.delete(id);
    const all = await orderDetailService.getAll();

    const found = all.find((o) => o.getOrderDetailId() === id);
    expect(found).toBeUndefined();
  });
});
