import dotenv from "dotenv";
import app from "../../server";
import supertest from "supertest";

dotenv.config();
const { JWT_TEST_TOKEN } = process.env;
const token = JWT_TEST_TOKEN as string;
const request = supertest(app);
const userInstance = {firstname: "ahmed",lastname: "dakhli",username: "ahmeddakhli",password: "CpsodK3918"};
describe("Users", () => {
  it("  return success for CREATE user", async () => {
    const response = await request.post("/users/register").send(userInstance);
    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });

  it("  return success for READ user by username", async () => {
    const response = await request.get("/users").auth(token, { type: "bearer" }).send(`username=${userInstance.username}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });
  it("  return success for LOGIN user", async () => {
    const response = await request.post("/users/login").send({ username: userInstance.username, password: userInstance.password});
    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });
  it("  return success for READ all users", async () => {
    const response = await request .get("/users") .auth(token, { type: "bearer" });
    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });

  it("  return success for DELETE user by username", async () => {
    const response = await request.delete("/users").send({ username: userInstance.username, });
    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });
});
