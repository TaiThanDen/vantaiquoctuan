export interface Truck {
    id: string;
    slug: string;
    name: string;
    models: string;
    brand: string;
    load: number;
    load_unit: string;
    description: string;
    license_plate: string;
    year: number;
    color: string;
    owner_name: string;
    owner_phone: string;
    documents: any;
    status: string;
    registration_expiry?: string;
    truck_types?: { id: string; name: string }[];
    service_types?: { id: string; name: string }[];
    images?: { url: string }[];
}

export class TruckClientService {
    static async getAll(page = 1, limit = 10) {
        const response = await fetch(`/api/trucks?page=${page}&limit=${limit}`);
        if (!response.ok) {
            throw new Error("Failed to fetch trucks");
        }
        return response.json();
    }

    static async getBySlug(slug: string) {
        const response = await fetch(`/api/trucks/${slug}`, {
            method: "GET",
            cache: "no-store",
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch truck: ${response.status}`);
        }

        return response.json();
    }

    static async delete(id: string) {
        const response = await fetch(`/api/trucks/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error(`Failed to delete truck: ${response.status}`);
        }

        return response.json();
    }
    static async getById(id: string) {
        const response = await fetch(`/api/trucks/${id}`, {
            method: "GET",
            cache: "no-store",
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch truck: ${response.status}`);
        }

        return response.json();
    }

    static async update(id: string, data: Partial<Truck>) {
        const response = await fetch(`/api/trucks/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Failed to update truck: ${response.status}`);
        }

        return response.json();
    }

    static async search(keyword: string, page = 1, limit = 10) {
        const response = await fetch(`/api/trucks/search?keyword=${encodeURIComponent(keyword)}&page=${page}&limit=${limit}`);
        if (!response.ok) {
            throw new Error("Failed to search trucks");
        }
        return response.json();
    }

}