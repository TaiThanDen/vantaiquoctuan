import {db} from "@/lib/db";
import {ServiceTypeQueries} from "@/lib/queries/service";

export class ServiceTypeService {
    static async getAll() {
        const result = await db.query(ServiceTypeQueries.getAll);
        return result.rows;
    }
}  