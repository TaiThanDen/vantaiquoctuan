import { db } from "@/lib/db";
import { OrderQueries } from "@/lib/queries/orders";

export class OrderService {
  static async getAll(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const result = await db.query(`${OrderQueries.getAll} LIMIT $1 OFFSET $2`, [limit, offset]);
    return result.rows;
  }

  static async create(data: any) {
    const result = await db.query(OrderQueries.insert, [
      data.customer_name,
      data.customer_phone,
      data.service_type_id,
      data.truck_id,
      data.weight,
      data.weight_unit,
      data.from_location,
      data.to_location,
      data.duration,
      data.status,
      new Date(),
    ]);
    return result.rows[0];
  }

  static async update(id: string, data: any) {
    const result = await db.query(OrderQueries.update, [
      data.customer_name,
      data.customer_phone,
      data.service_type_id,
      data.truck_id,
      data.weight,
      data.weight_unit,
      data.from_location,
      data.to_location,
      data.duration,
      data.status,
      id,
    ]);
    return result.rows[0];
  }
  static async getById(id: string) {
    const result = await db.query(OrderQueries.getById, [id]);
    return result.rows[0] ?? null;
  }
  static async getNewsBySlug(id: string) {
    const result = await db.query("SELECT * FROM orders WHERE slug = $1", [id]);
    return result.rows[0];
  }
  static async delete(id: string) {
    const result = await db.query(OrderQueries.delete, [id]);
    return result.rows[0] ?? null;
  }
  static async search(query: string, limit = 10, offset = 0) {
    const q = (query ?? "").trim();
    if (!q) return [];
    const searchQuery = `%${q}%`;
    const result = await db.query(OrderQueries.search, [searchQuery, limit, offset]);
    return result.rows;
  }

}