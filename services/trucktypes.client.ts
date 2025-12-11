export interface TruckTypes {
    id: string;
    name: string;
}

export class TruckTypesClient {
    static async getAll(page = 1, limit = 10, keyword = "") {
        const url = `/api/truck-types?page=${page}&limit=${limit}${keyword ? `&keyword=${encodeURIComponent(keyword)}` : ""}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch truck types");
        }
        return response.json();
    }
    static async deleteById(id: string) {
        const response = await fetch(`/api/truck-types/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error("Failed to delete truck type");
        }
        return response.json();
    }
    static async getById(id: string) {
        const response = await fetch(`/api/truck-types/${id}`);
        if (!response.ok) {
            throw new Error("Failed to fetch truck type");
        }
        return response.json();
    }
    static async create(name: string) {
        const response = await fetch(`/api/truck-types`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name }),
        });
        if (!response.ok) {
            throw new Error("Failed to create truck type");
        }
        return response.json();
    }
    static async update(id: string, name: string) {
        const response = await fetch(`/api/truck-types/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name }),
        });
        if (!response.ok) {
            throw new Error("Failed to update truck type");
        }
        return response.json();
    }
}