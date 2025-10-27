// src/services/review.service.ts

import { OrderDetail } from '../../models/entity/orderDetail';
import orderDetailService from '../../services/orderDetail.service';

describe('OrderDetail Service - Unit Tests', () => {
  let createdOrderDetail: OrderDetail;

  const sampleOrderDetail = new OrderDetail(1, 1, 1, 2, 15000);

  beforeAll(async () => {
    createdOrderDetail = await orderDetailService.create(sampleOrderDetail);
  });

  // para que me de info en consola
  it('should create a new order detail', async () => {
    console.log('Created review:', createdOrderDetail);
    expect(createdOrderDetail).toHaveProperty('order_detail_id');
    expect(createdOrderDetail.getSubtotal()).toBe(sampleOrderDetail.getSubtotal());
  });

  it('should return all order details', async () => {
    const all = await orderDetailService.getAll();
    console.log('All reviews:', all);
    expect(all.length).toBeGreaterThan(0);
  });

  it('should get order details by order ID', async () => {
    const ordersdetail = await orderDetailService.getByOrderId(sampleOrderDetail.getProductId());
    console.log(`order details for order_id=${sampleOrderDetail.getOrderId()}:`, ordersdetail);
    expect(ordersdetail.length).toBeGreaterThan(0);
    expect(ordersdetail[0]!.getOrderId()).toBe(sampleOrderDetail.getOrderId());
  });

  it('should get order details by product ID', async () => {
    const ordersdetail = await orderDetailService.getByProductId(sampleOrderDetail.getProductId());
    console.log(`order details for product_ID=${sampleOrderDetail.getProductId()}:`, ordersdetail);
    expect(ordersdetail.length).toBeGreaterThan(0);
    expect(ordersdetail[0]!.getProductId()).toBe(sampleOrderDetail.getProductId());
  });

  it('should delete a order detail', async () => {
    const deleted = await orderDetailService.delete(createdOrderDetail.getOrderDetailId());
    console.log(`Deleted order detail with id ${createdOrderDetail.getOrderDetailId()}:`, deleted);
    expect(deleted).toBe(true);

    const deletedAgain = await orderDetailService.delete(createdOrderDetail.getOrderDetailId());
    console.log(
      `Deleted again review with id ${createdOrderDetail.getOrderDetailId()}:`,
      deletedAgain,
    );
    expect(deletedAgain).toBe(false);
  });
});
