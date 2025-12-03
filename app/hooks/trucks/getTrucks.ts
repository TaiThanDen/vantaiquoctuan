import { useState, useEffect } from "react";
import { TruckClientService } from "@/services/trucks.client";

export function useTrucks(page = 1, limit = 10) {
    const [trucks, setTrucks] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTrucks = async () => {
        try {
            setLoading(true);
            const data = await TruckClientService.getAll(page, limit);
            setTrucks(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to fetch trucks");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTrucks();
    }, [page, limit]);

    return { trucks, loading, error, refetch: fetchTrucks };
}