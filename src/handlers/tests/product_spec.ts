import dotenv from "dotenv";
import app from "../../server";
import supertest from "supertest";



dotenv.config();
const request = supertest(app);
const productInstance = { name: "orange", price: 80};
const { JWT_TEST_TOKEN } = process.env;
const token = JWT_TEST_TOKEN as string;

describe("Products", () => {
  it("  return success for CREATE product", async () => {
    const response = await request.post("/products").auth(token, { type: "bearer" }).send(productInstance);
    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });
  it("  return success for READ all products", async () => {
    const response = await request.get("/products");
    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });
  it("  return success for READ product by product name", async () => {
    const response = await request.get("/products").send(`productName=${productInstance.name}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });

  it("  return success for DELETE product by product id", async () => {
    const response = await request.delete("/products").auth(token, { type: "bearer" }).send({ productName: productInstance.name });
    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });
});
