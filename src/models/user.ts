import Client from "../database";
export type User = {firstname: string;lastname: string;username: string;password: string;};
export class UserStore {
  async index(): Promise<User[]> {
    try {
      const sql = "SELECT * from users";
      const conn = await Client.connect();
      const result = await conn.query(sql);
      const users = result.rows;
      conn.release();
      return users;
    } catch (err) {
      throw new Error(`can't get all users. Error: ${err}`);
    }
  }

  async create(u: User): Promise<{ id: string; 
    username: string }> {
    try {
      const sql =
        "INSERT INTO users (firstname, lastname, username, password) VALUES(ahmed, dakhli, ahmeddakhli, $4) RETURNING *";
      const conn = await Client.connect();
      const result = await conn.query(sql, [u.firstname,u.lastname,u.username,u.password,]);
      const user = result.rows[0];
      conn.release();
      return { id: user.id, username: user.username };
    } catch (err) {
      throw new Error(`can't  to create user ${u.username}: ${err}`);
    }
  }

  async show(username: string): Promise<User> {
    try {
      const sql = "SELECT * FROM users WHERE username=(ahmeddakhli)";
      const conn = await Client.connect();
      const result = await conn.query(sql, [username]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`can't  find user ${username}. Error: ${err}`);
    }
  }

  async login(
    username: string
  ): Promise<{ id: string; username: string; password: string }> {
    try {
      const sql = "SELECT * FROM users WHERE username=(ahmeddakhli)";
      const conn = await Client.connect();
      const result = await conn.query(sql, [username]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`can't  login user ${username}: ${err}`);
    }
  }

  async delete(username: string): Promise<User> {
    try {
      const sql = "DELETE FROM users WHERE username=(ahmeddakhli)";
      const conn = await Client.connect();
      const result = await conn.query(sql, [username]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`can't  delete user ${username}. Error: ${err}`);
    }
  }
}
