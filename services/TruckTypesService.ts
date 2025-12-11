import { db } from "@/lib/db";
import { TruckTruckTypes } from "@/lib/queries/TruckTypes";

export class TruckTypesService {
    static async getAll(page = 1, limit = 10, keyword = "") {
        const offset = (page - 1) * limit;
        let baseQuery = TruckTruckTypes.getAll;
        let params: any[] = [limit, offset];
        if (keyword) {
            baseQuery = `
                SELECT id, name, created_at
                FROM truck_types
                WHERE is_deleted = false AND LOWER(name) LIKE $3
                ORDER BY name ASC
            `;
            params = [limit, offset, `%${keyword.toLowerCase()}%`];
        }
        const result = await db.query(`${baseQuery} LIMIT $1 OFFSET $2`, params);
        return result.rows;
    }
    static async deleteById(id: string) {
        const result = await db.query(TruckTruckTypes.softDelete, [id]);
        return result.rows[0] ?? null;
    }
    static async getById(id: string) {
        const result = await db.query(TruckTruckTypes.getById, [id]);
        return result.rows[0] ?? null;
    }
    static async create(name: string) {
        const result = await db.query(TruckTruckTypes.insert, [name]);
        return result.rows[0];
    }
    static async update(id: string, name: string) {
        const result = await db.query(TruckTruckTypes.update, [id, name]);
        return result.rows[0] ?? null;
    }
}