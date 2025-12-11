export interface ServiceTypes {
    id: string;
    name: string;
}
export class ServiceTypesClient {
    static async getAll(page = 1, limit = 10, keyword = "") {
        const url = `/api/service-types?page=${page}&limit=${limit}${keyword ? `&keyword=${encodeURIComponent(keyword)}` : ""}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch service types");
        }
        return response.json();
    }
    static async create(name: string) {
        const response = await fetch(`/api/service-types`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name }),
        });
        if (!response.ok) {
            throw new Error("Failed to create service type");
        }
        return response.json();
    }
    static async getById(id: string) {
        const response = await fetch(`/api/service-types/${id}`);
        if (!response.ok) {
            throw new Error("Failed to fetch service type");
        }
        return response.json();
    }
    static async update(id: string, name: string) {
        const response = await fetch(`/api/service-types/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name }),
        });
        if (!response.ok) {
            throw new Error("Failed to update service type");
        }
        return response.json();
    }
    static async deleteById(id: string) {
        const response = await fetch(`/api/service-types/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error("Failed to delete service type");
        }
        return response.json();
    }
}