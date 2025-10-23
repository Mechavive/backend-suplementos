
import { OrderDetailCrud } from "../../crud/orderDetailCrud.interface.js";
import { OrderDetail } from "../../interface/orderDetail.js";

export class MockOrderDetail implements OrderDetailCrud {

    private OrderDetails: OrderDetail[] = []
    private idCounter = 1

    constructor() {
        this.OrderDetails = [
            {
                order_detail_id: this.idCounter++,
                order_id: 1,
                product_id: 1,
                quantity: 2,
                unit_price: 15000
            },
            {
                order_detail_id: this.idCounter++,
                order_id: 1,
                product_id: 2,
                quantity: 1,
                unit_price: 8000
            }
        ]
    }

    getAll(): Promise<OrderDetail[]> {
        throw new Error("Method not implemented.");
    }
    getById(id: number): Promise<OrderDetail | undefined> {
        throw new Error("Method not implemented.");
    }
    getByOrderId(orderId: number): Promise<OrderDetail[]> {
        throw new Error("Method not implemented.");
    }
    getByProductId(productId: number): Promise<OrderDetail[]> {
        throw new Error("Method not implemented.");
    }
    create(order: OrderDetail): Promise<OrderDetail> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}