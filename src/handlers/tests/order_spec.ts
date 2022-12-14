import bcrypt from "bcrypt";
import dotenv from "dotenv";
import supertest from "supertest";
import app from "../../server";
import { ProductStore } from "../../models/product";
import { User, UserStore } from "../../models/user";
dotenv.config();
const { BCRYPT_SALT_ROUNDS, BCRYPT_PEPPER, JWT_TEST_TOKEN } = process.env;
const token = JWT_TEST_TOKEN as string;
const request = supertest(app);
const userStore = new UserStore();
const productStore = new ProductStore();
const userInstance = {
  firstname: "Ahmed",
  lastname: "Dakhli",
  username: "ahmeddakhli",
};
const userInstancePassword = "GuoUo1ayD";
const productInstance = { name: "orange", price: 10,};
describe("Orders", () => {
  beforeAll(async () => {


    const salt = await bcrypt.genSalt(parseInt(BCRYPT_SALT_ROUNDS as string));
    const pepperedPassword = `${userInstancePassword}${BCRYPT_PEPPER}`;
    const hashPassword = bcrypt.hashSync(pepperedPassword, salt);

    const user: User = {...userInstance,password: hashPassword as string,};
    await userStore.create(user);
    await productStore.create(productInstance);
  });

  it("should return success for CREATE order", async () => {
    const response = await request
      .post("/orders").auth(token, 
        { type: "bearer" })
        .send({ status: "ordered", userId: 1 });
    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });

  it("should return success for READ orders by user id", async () => {
    const response = await request.get("/orders").send("userId=1");
    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });
  it("should return success for READ all orders", async () => {
    const response = await request.get("/orders");
    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });

  it("should return success for CREATE order with product quantity and product id", async () => {
    const response = await request
      .post("/orders/products")
      .auth(token, { type: "bearer" })
      .send({ quantity: 2, orderId: 1, productId: 1 });

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });
  it("should return success for DELETE order by order id", async () => {
    const response = await request
      .delete("/orders")
      .auth(token, { type: "bearer" })
      .send({ orderId: "1" });

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });
  it("should return success for DELETE order product with order product id", async () => {
    const response = await request
      .delete("/orders/products")
      .auth(token, { type: "bearer" })
      .send({ orderProductId: "1" });

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });



  afterAll(async () => {
    await productStore.delete(productInstance.name);
    await userStore.delete(userInstance.username);
  });
});
