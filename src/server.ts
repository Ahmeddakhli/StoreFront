import userRoutes from "./handlers/user";
import orderRoutes from "./handlers/order";
import productRoutes from "./handlers/product";
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
const app: express.Application = express();
const the_address: string = "0.0.0.0:3000";
app.use(bodyParser.json());
app.get("/", function (req: Request, res: Response) {res.send(" homepage ");});
orderRoutes(app);
productRoutes(app);
userRoutes(app);
app.listen(3000, function () {
  console.log(`starting on: ${the_address}`);
});
export default app;
