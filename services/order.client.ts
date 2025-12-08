
export interface CreateOrderData {
  customer_name: string;
  customer_phone: string;
  service_type_id?: string | null;
  weight?: number | null;
  weight_unit: string;
  from_location: string;
  to_location: string;
  status?: string;
}

export class OrderClientService {
  static async create(data: CreateOrderData) {
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // Kiểm tra xem response có nội dung không
    const text = await response.text();

    let result;
    try {
      result = text ? JSON.parse(text) : {};
    } catch (e) {
      throw new Error("Server không trả về dữ liệu hợp lệ");
    }

    if (!response.ok) {
      throw new Error(result.error || "Failed to create order");
    }

    return result;
  }

  static async getAll(page = 1, limit = 10) {
    const response = await fetch(`/api/orders?page=${page}&limit=${limit}`);
    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }
    return response.json();
  }

  static async getById(id: string) {
    const response = await fetch(`/api/orders/${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch order");
    }

    return response.json();
  }
  static async getBySlug(slug: string) {
    const response = await fetch(`/api/orders/slug/${slug}`);

    if (!response.ok) {
      throw new Error("Failed to fetch order by slug");
    }

    return response.json();
  }
  static async update(id: string, data: any) {
    const response = await fetch(`/api/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    if (!response.ok) throw new Error(json?.error || "Failed to update order");
    return json;
  }
  static async delete(id: string) {
    const response = await fetch(`/api/orders/${id}`, {
      method: "DELETE",
    });
    const json = await response.json();
    if (!response.ok) throw new Error(json?.error || "Failed to delete order");
    return json;
  }
  static async search(query: string, limit = 10, offset = 0) {
    const response = await fetch(
      `/api/orders/search?query=${encodeURIComponent(query)}&limit=${limit}&offset=${offset}`,
      { cache: "no-store" }
    );
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(data?.error || "Failed to search orders");
    }
    return data;
  }

}