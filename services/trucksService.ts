import { db } from "@/lib/db";
import { TruckQueries } from "@/lib/queries/trucks";
import { TruckImageQueries } from "@/lib/queries/TruckImageQueries";
import { TrucksServiceTypesQueries } from "@/lib/queries/TruckServiceTypeQueries";

export interface CreateTruckData {
  name: string;
  models: string;
  brand: string;
  load: number;
  load_unit: string;
  description?: string;
  license_plate?: string;
  year?: number;
  color?: string;
  owner_name?: string;
  owner_phone?: string;
  documents?: any;
  status: string;
  registration_expiry?: string;
  truck_type_ids?: string[];
  service_type_ids?: string[];
  image_urls?: string[];
}

function generateSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export class TrucksService {
  static async getAll() {
    const result = await db.query(TruckQueries.getAll);
    return result.rows;
  }

  static async getById(id: string) {
    const result = await db.query(TruckQueries.getById, [id]);
    return result.rows[0];
  }

  static async getBySlug(slug: string) {
    const result = await db.query(TruckQueries.getBySlug, [slug]);
    return result.rows[0];
  }

  static async create(data: CreateTruckData) {
    const client = await db.connect();

    try {
      await client.query('BEGIN');

      const slug = generateSlug(data.name);

      // 1. Tạo truck
      const truckResult = await client.query(TruckQueries.insert, [
        data.name,
        slug,
        data.models,
        data.brand,
        data.load,
        data.load_unit,
        data.description || null,
        data.license_plate || null,
        data.year || null,
        data.color || null,
        data.owner_name || null,
        data.owner_phone || null,
        data.documents ? JSON.stringify(data.documents) : null,
        data.status,
        data.registration_expiry || null,
        new Date(),
      ]);

      const truck = truckResult.rows[0];

      // 2. Thêm truck types
      if (data.truck_type_ids && data.truck_type_ids.length > 0) {
        for (const typeId of data.truck_type_ids) {
          await client.query(
            `INSERT INTO truck_truck_types (id, truck_id, truck_type_id, created_at)
             VALUES (uuid_generate_v4(), $1, $2, NOW())`,
            [truck.id, typeId]
          );
        }
      }

      // 3. Thêm service types
      if (data.service_type_ids && data.service_type_ids.length > 0) {
        for (const serviceTypeId of data.service_type_ids) {
          await client.query(TrucksServiceTypesQueries.insert, [
            truck.id,
            serviceTypeId,
          ]);
        }
      }

      // 4. Thêm images
      if (data.image_urls && data.image_urls.length > 0) {
        for (const imageUrl of data.image_urls) {
          await client.query(
            `INSERT INTO truck_images (id, truck_id, image_url, created_at)
             VALUES (uuid_generate_v4(), $1, $2, NOW())`,
            [truck.id, imageUrl]
          );
        }
      }

      await client.query('COMMIT');

      // Lấy lại truck với đầy đủ thông tin
      return await this.getBySlug(truck.slug);
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  static async update(id: string, data: Partial<CreateTruckData>) {
    // Implementation for updating a truck
    throw new Error("Not implemented yet");
  }

  static async delete(id: string) {
    const client = await db.connect();
    try {
      await client.query('BEGIN');

      // Xóa các liên kết trong bảng trung gian trước
      await client.query('DELETE FROM truck_truck_types WHERE truck_id = $1', [id]);
      await client.query('DELETE FROM truck_service_types WHERE truck_id = $1', [id]);
      await client.query('DELETE FROM truck_images WHERE truck_id = $1', [id]);

      // Xóa truck
      const result = await client.query(TruckQueries.delete, [id]);

      await client.query('COMMIT');

      return result.rows[0];
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  static async getPaged(page: number = 1, limit: number = 10) {
    const offset = (page - 1) * limit;
    const result = await db.query(TruckQueries.getPaged, [limit, offset]);
    return result.rows;
  }


}

