import { db } from "@/lib/db";
import { TruckTruckTypes } from "@/lib/queries/TruckTypes";

export class TruckTypesService {
    static async getAll(page = 1, limit = 10) {
        const offset = (page - 1) * limit;
        const result = await db.query(`${TruckTruckTypes.getAll} LIMIT $1 OFFSET $2`, [limit, offset]);
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
}