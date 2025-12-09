export interface TruckTypes {
    id: string;
    name: string;
}

export class TruckTypesClient {
    static async getAll(page = 1, limit = 10) {
        const response = await fetch(`/api/truck-types?page=${page}&limit=${limit}`);
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
}