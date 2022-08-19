import dotenv from "dotenv";
import { Pool } from "pg";
dotenv.config();
const { DEV_DB,POSTGRES_HOST, TEST_DB, USER, PASSWORD, ENV,} = process.env;
let client: Pool;
client = new Pool({host: POSTGRES_HOST,database: ENV === "dev" ? DEV_DB : TEST_DB,user: USER,password: PASSWORD,});
export default client;
