import { Pool } from "pg";

export class SharedService<T extends { [key: string]: any }> {
  constructor(
    private pool: Pool,
    private table: string,
    private idField: string = "id"
  ) {}

  async getAll(): Promise<T[]> {
    const { rows } = await this.pool.query(`SELECT * FROM ${this.table}`);
    return rows;
  }

  async getById(id: string): Promise<T | null> {
    const { rows } = await this.pool.query(
      `SELECT * FROM ${this.table} WHERE "${this.idField}" = $1`,
      [id]
    );
    return rows[0] || null;
  }

  async create(data: Partial<T>, workerId: string): Promise<T> {
    const now = new Date();
    const commonFields = {
      createdate: now,
      createworker: workerId,
      updatedate: now,
      updateworker: workerId,
    };
    const allData = { ...data, ...commonFields };

    const keys = Object.keys(allData)
      .map((k) => `"${k}"`)
      .join(", ");
    const values = Object.values(allData);
    const placeholders = values.map((_, i) => `$${i + 1}`).join(", ");

    const { rows } = await this.pool.query(
      `INSERT INTO ${this.table} (${keys}) VALUES (${placeholders}) RETURNING *`,
      values
    );
    return rows[0];
  }

  async update(id: string, data: Partial<T>, workerId: string): Promise<T> {
    const now = new Date();
    const allData = { ...data, updatedate: now, updateworker: workerId };

    const set = Object.keys(allData)
      .map((k, i) => `"${k}"=$${i + 1}`)
      .join(", ");
    const values = Object.values(allData);

    const { rows } = await this.pool.query(
      `UPDATE ${this.table} SET ${set} WHERE "${this.idField}"=$${
        values.length + 1
      } RETURNING *`,
      [...values, id]
    );
    return rows[0];
  }

  async delete(id: string): Promise<void> {
    await this.pool.query(
      `DELETE FROM ${this.table} WHERE "${this.idField}"=$1`,
      [id]
    );
  }
}
