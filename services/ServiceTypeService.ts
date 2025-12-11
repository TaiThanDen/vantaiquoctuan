import { db } from "@/lib/db";
import { ServiceTypeQueries } from "@/lib/queries/serviceTypes";

export class ServiceTypeService {
    static async getAll(page = 1, limit = 10, keyword = "") {
        const offset = (page - 1) * limit;
        if (keyword) {
            const result = await db.query(
                ServiceTypeQueries.getAllWithKeyword,
                [limit, offset, `%${keyword.toLowerCase()}%`]
            );
            return result.rows;
        }
        const result = await db.query(ServiceTypeQueries.getAll, [limit, offset]);
        return result.rows;
    }
    static async create(name: string) {
        const result = await db.query(ServiceTypeQueries.create, [name]);
        return result.rows[0];
    }
    static async getById(id: string) {
        const result = await db.query(ServiceTypeQueries.getById, [id]);
        return result.rows[0] ?? null;
    }
    static async update(id: string, name: string) {
        const result = await db.query(ServiceTypeQueries.update, [id, name]);
        return result.rows[0] ?? null;
    }
    static async deleteById(id: string) {
        const result = await db.query(ServiceTypeQueries.softDelete, [id]);
        return result.rows[0] ?? null;
    }
}