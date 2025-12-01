import { db } from "@/lib/db";
import { OrderQueries } from "@/lib/queries/orders";

export class OrderService {
  static async getAll() {
    const result = await db.query(OrderQueries.getAll);
    return result.rows;
  }

  static async create(data: any) {
    const result = await db.query(OrderQueries.insert, [
      data.customer_name,
      data.customer_phone,
      data.service_type_id,
      data.weight,
      data.weight_unit,
      data.from_location,
      data.to_location,
      data.status,
      new Date(),
    ]);
    return result.rows[0];
  }
}
