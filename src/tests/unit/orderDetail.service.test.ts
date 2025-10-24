// src/services/review.service.ts

import { OrderDetailInput } from '../../dtos/orderDetail.dto.js';
import { OrderDetail } from '../../models/interface/orderDetail.js';
import orderDetailService from '../../services/orderDetail.service.js';

describe('OrderDetail Service - Unit Tests', () => {
  let createdOrderDetail: OrderDetail;

  const sampleOrderDetail: OrderDetailInput = {
    order_id: 1,
    product_id: 1,
    quantity: 4,
    unit_price: 15000,
  };

  beforeAll(async () => {
    createdOrderDetail = await orderDetailService.create(sampleOrderDetail);
  });

  // para que me de info en consola
  it('should create a new order detail', async () => {
    console.log('Created review:', createdOrderDetail);
    expect(createdOrderDetail).toHaveProperty('order_detail_id');
    expect(createdOrderDetail.comment).toBe(sampleOrderDetail.comment);
  });

  it('should return all order details', async () => {
    const all = await orderDetailService.getAll();
    console.log('All reviews:', all);
    expect(all.length).toBeGreaterThan(0);
  });

  it('should get order details by order ID', async () => {
    const ordersdetail = await orderDetailService.getByOrderId(sampleOrderDetail.product_id);
    console.log(`order details for order_id=${sampleOrderDetail.order_id}:`, ordersdetail);
    expect(ordersdetail.length).toBeGreaterThan(0);
    expect(ordersdetail[0]!.order_id).toBe(sampleOrderDetail.product_id);
  });

  it('should get order details by product ID', async () => {
    const ordersdetail = await orderDetailService.getByProductId(sampleOrderDetail.product_id);
    console.log(`order details for product_ID=${sampleOrderDetail.product_id}:`, ordersdetail);
    expect(ordersdetail.length).toBeGreaterThan(0);
    expect(ordersdetail[0]!.product_id).toBe(sampleOrderDetail.product_id);
  });

  it('should delete a order detail', async () => {
    const deleted = await orderDetailService.delete(createdOrderDetail.order_detail_id);
    console.log(`Deleted order detail with id ${createdOrderDetail.order_detail_id}:`, deleted);
    expect(deleted).toBe(true);

    const deletedAgain = await orderDetailService.delete(createdOrderDetail.order_detail_id);
    console.log(
      `Deleted again review with id ${createdOrderDetail.order_detail_id}:`,
      deletedAgain,
    );
    expect(deletedAgain).toBe(false);
  });
});
