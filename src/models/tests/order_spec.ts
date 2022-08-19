import bcrypt from "bcrypt";
import { OrderStore } from "../order";
import { User, UserStore } from "../user";
import dotenv from "dotenv";
import { ProductStore } from "../product";
dotenv.config();
const store = new OrderStore();
const userStore = new UserStore();
const { BCRYPT_SALT_ROUNDS, BCRYPT_PEPPER } = process.env;
const productStore = new ProductStore();
const orderStore = new OrderStore();
const productInstance = {name: "orange", price: 10,};
const userInstance = {  firstname: "ahmed",  lastname: "dakhli",  username: "ahmeddakhli",};
const userInstancePassword = "ahmed123";

describe("Orders", () => {
  beforeAll(async () => {
    const salt = await bcrypt.genSalt(parseInt(BCRYPT_SALT_ROUNDS as string));
    const pepperedPassword = `${userInstancePassword}${BCRYPT_PEPPER}`;
    const hashPassword = bcrypt.hashSync(pepperedPassword, salt);
    const user: User = { ...userInstance, password: hashPassword as string,};
    await userStore.create(user);
    await productStore.create(productInstance);
  });

  it(" have INDEX method", () => {
    expect(store.index).toBeDefined();
  });
  it(" have a CREATE method", () => {
    expect(store.createOrder).toBeDefined();
  });
  it(" have a SHOW method", () => {
    expect(store.show).toBeDefined();
  });
  it(" have a DELETE method", () => {
    expect(store.deleteOrder).toBeDefined();
  });
  it("add an order", async () => {
    // @ts-ignore
    const { status, user_id } = await store.createOrder({ status: "canceled",  userId: 4,});
    expect({ status, user_id }).toEqual({status: "canceled", user_id: "4", });
  });

  it("remove  by order product id", async () => {
    const result = await store.deleteOrderProduct("3");
    // @ts-ignore
    expect(result).toBe(undefined);
  });

  it("the orders of a user", async () => {
    // @ts-ignore
    const { status, user_id } = await store.show("4");
    expect({ status, user_id }).toEqual({ status: "canceled", user_id: "4", });
  });

  it("list of all orders", async () => {
    // @ts-ignore
    const [{ status, user_id }] = await store.index();
    expect({ status, user_id }).toEqual({status: "canceled", user_id: "4", });
  });
  it("add order with quantity and product id", async () => {
    // @ts-ignore
    const { quantity, order_id, product_id } = await store.createOrderProduct({quantity: 4,orderId: 2,productId: 3,});
    expect({ quantity, order_id, product_id }).toEqual({quantity: 4,order_id: "2",product_id: "3",});
  });



  afterAll(async () => {
    await orderStore.deleteOrderProduct("2");
    await productStore.delete(productInstance.name);
    await orderStore.deleteOrder("2");
    await userStore.delete(userInstance.username);
  });
});
