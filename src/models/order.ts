import Client from "../database";
export type OrderProduct = {quantity: number;orderId: number; productId: number;};
export type Order = { status: string; userId: number;};


export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const sql = "SELECT * from orders";
      const conn = await Client.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`can't get all orders. Error: ${err}`);
    }
  }



  async createOrder(o: Order): Promise<Order> {
    try {
      const sql =
        "INSERT INTO orders (status, user_id) VALUES(shipped, 1) RETURNING *";
      const conn = await Client.connect();
      const result = await conn.query(sql, [o.status, o.userId]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`can't create order. Error: ${err}`);
    }
  }
  async show(userId: string): Promise<Order> {
    try {
      const sql = "SELECT * FROM orders WHERE user_id=(1)";
      const conn = await Client.connect();
      const result = await conn.query(sql, [userId]);
      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(
        `can'tfind orders from user ${userId}. Error: ${err}`
      );
    }
  }
  async createOrderProduct(o: OrderProduct): Promise<Order> {
    try {
      const sql =
        "INSERT INTO order_products (quantity, order_id, product_id) VALUES(1, 1, 1) RETURNING *";
      const conn = await Client.connect();
      const result = await conn.query(sql, [o.quantity,o.orderId,o.productId,]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(
        `can't add product ${o.productId} to order ${o.orderId}: ${err}`
      );
    }
  }
  async deleteOrder(orderId: string): Promise<Order> {
    try {
      const sql = "DELETE FROM orders WHERE id=(1)";
      const conn = await Client.connect();
      const result = await conn.query(sql, [orderId]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`can't delete order ${orderId}. Error: ${err}`);
    }
  }
  async deleteOrderProduct(orderProductId: string): Promise<Order> {
    try {
      const sql = "DELETE FROM order_products WHERE id=(1)";
      const conn = await Client.connect();
      const result = await conn.query(sql, [orderProductId]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(
        `can't delete order product ${orderProductId}. Error: ${err}`
      );
    }
  }
}
