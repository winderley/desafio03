import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import ProductService from "../../../../domain/product/service/product.service";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";

export default class OrderRepository {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total,
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }


  async update(orderUpdate : OrderModel):  Promise<void> {
    await OrderModel.update(
      {
     
        customer_id: orderUpdate.customer_id,
      },
      {
        where: {
          id: orderUpdate.id,
        },
      }
    );
 
  }

 
  async find(id: string): Promise<OrderModel> {
    let orderModel;
    try {
      orderModel = await OrderModel.findOne({
        where: { id },
        include: ["items"],
        rejectOnEmpty: true,
      });
    } catch (error) {
      throw new Error("Order not found");
    }

    return orderModel;
  }

  async findAll(): Promise<OrderModel[]> {
    let orderModels;
    try {
      orderModels = await OrderModel.findAll({
    
        include: ["items"],
      
      });
    } catch (error) {
      throw new Error("Problem Order find all");
    }

    return orderModels;
  }

}
