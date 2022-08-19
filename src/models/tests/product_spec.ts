import { ProductStore } from "../product";
const store = new ProductStore();
describe("Products", () => {
  it(" have a SHOW method", () => {
    expect(store.show).toBeDefined();
  });
  it(" have an INDEX method", () => {
    expect(store.index).toBeDefined();
  });

  it(" have a DELETE method", () => {
    expect(store.delete).toBeDefined();
  });

  it(" have a CREATE method", () => {
    expect(store.create).toBeDefined();
  });
  it("add a product", async () => {
    const { name, price } = await store.create({name: "orange",price: 10, });
    expect({ name, price }).toEqual({  name: "orange",  price: 10,});
  });
  it("remove a product by product name", async () => {
    await store.delete("banana");
    const result = await store.show("banana");
    // @ts-ignore
    expect(result).toBe(undefined);
  });


  it("return a product by product name", async () => {
    const { name, price } = await store.show("banana");
    expect({ name, price }).toEqual({name: "orange", price: 10  });
  });
  it("return a list of products", async () => {
    const [{ name, price }] = await store.index();
    expect([{ name, price }]).toEqual([{  name: "orange",price: 10,}, ]);
  });


});
