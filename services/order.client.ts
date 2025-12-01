
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
      console.error("JSON parse error:", e);
      throw new Error("Server không trả về dữ liệu hợp lệ");
    }

    if (!response.ok) {
      console.error("Server error:", result);
      throw new Error(result.error || "Failed to create order");
    }

    return result;
  }

  static async getAll() {
    const response = await fetch("/api/orders");
    
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
}
