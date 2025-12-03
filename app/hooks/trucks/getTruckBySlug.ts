import { useState, useEffect } from "react";
import { TruckClientService, Truck } from "@/services/trucks.client";

export function useTruck(slug: string) {
    const [truck, setTruck] = useState<Truck | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTruck = async () => {
            try {
                setLoading(true);
                const data = await TruckClientService.getBySlug(slug);
                setTruck(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to fetch truck");
            } finally {
                setLoading(false);
            }
        };
        if (slug) {
            fetchTruck();
        }
    }, [slug]);

    return { truck, loading, error };
}
