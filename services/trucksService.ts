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
    const truck = result.rows[0];
    if (truck && typeof truck.description === "string") {
      try {
        truck.description = JSON.parse(truck.description);
      } catch {
        // Nếu không phải JSON, giữ nguyên
      }
    }
    return truck;
  }

  static async getBySlug(slug: string) {
    const result = await db.query(TruckQueries.getBySlug, [slug]);
    const truck = result.rows[0];

    if (truck) {
      // Parse description nếu là string
      if (typeof truck.description === "string") {
        try {
          truck.description = JSON.parse(truck.description);
        } catch {
          // Nếu parse lỗi, set thành object rỗng để editor không lỗi
          truck.description = {
            type: "doc",
            content: []
          };
        }
      }
    }

    return truck;
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
    const client = await db.connect();

    try {
      await client.query('BEGIN');

      // Lấy truck hiện tại
      const currentTruck = await this.getById(id);
      if (!currentTruck) {
        throw new Error("Truck not found");
      }

      const slug = data.name ? generateSlug(data.name) : currentTruck.slug;

      // 1. Cập nhật truck
      const truckResult = await client.query(TruckQueries.update, [
        data.name ?? currentTruck.name,
        slug,
        data.models ?? currentTruck.models,
        data.brand ?? currentTruck.brand,
        data.load ?? currentTruck.load,
        data.load_unit ?? currentTruck.load_unit,
        data.description ? JSON.stringify(data.description) : currentTruck.description,
        data.license_plate ?? currentTruck.license_plate,
        data.year ?? currentTruck.year,
        data.color ?? currentTruck.color,
        data.owner_name ?? currentTruck.owner_name,
        data.owner_phone ?? currentTruck.owner_phone,
        data.documents ? JSON.stringify(data.documents) : currentTruck.documents,
        data.status ?? currentTruck.status,
        data.registration_expiry ?? currentTruck.registration_expiry,
        id,
      ]);

      const truck = truckResult.rows[0];

      // 2. Cập nhật truck types nếu có
      if (data.truck_type_ids !== undefined) {
        // Xóa tất cả truck types cũ
        await client.query('DELETE FROM truck_truck_types WHERE truck_id = $1', [id]);

        // Thêm truck types mới
        if (data.truck_type_ids.length > 0) {
          for (const typeId of data.truck_type_ids) {
            await client.query(
              `INSERT INTO truck_truck_types (id, truck_id, truck_type_id, created_at)
               VALUES (uuid_generate_v4(), $1, $2, NOW())`,
              [id, typeId]
            );
          }
        }
      }

      // 3. Cập nhật service types nếu có
      if (data.service_type_ids !== undefined) {
        // Xóa tất cả service types cũ
        await client.query('DELETE FROM truck_service_types WHERE truck_id = $1', [id]);

        // Thêm service types mới
        if (data.service_type_ids.length > 0) {
          for (const serviceTypeId of data.service_type_ids) {
            await client.query(TrucksServiceTypesQueries.insert, [
              id,
              serviceTypeId,
            ]);
          }
        }
      }

      // 4. Cập nhật images nếu có
      if (data.image_urls !== undefined) {
        // Xóa tất cả images cũ
        await client.query('DELETE FROM truck_images WHERE truck_id = $1', [id]);

        // Thêm images mới
        if (data.image_urls.length > 0) {
          for (const imageUrl of data.image_urls) {
            await client.query(
              `INSERT INTO truck_images (id, truck_id, image_url, created_at)
               VALUES (uuid_generate_v4(), $1, $2, NOW())`,
              [id, imageUrl]
            );
          }
        }
      }

      await client.query('COMMIT');

      // Lấy lại truck với đầy đủ thông tin
      return await this.getById(id);
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
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

  static async search(keyword: string, page: number = 1, limit: number = 10) {
    const offset = (page - 1) * limit;
    const searchPattern = `%${keyword}%`;
    const result = await db.query(TruckQueries.search, [searchPattern, limit, offset]);
    return result.rows;
  }

}

