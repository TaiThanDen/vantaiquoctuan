import { useState, useEffect } from "react";
import { TruckClientService } from "@/services/trucks.client";
export const useTruckByID = (id: string) => {
    const [truck, setTruck] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTruck = async () => {
            try {
                setLoading(true);
                const data = await TruckClientService.getById(id);
                setTruck(data);
            }
            catch (err) {
                setError(err instanceof Error ? err.message : "Failed to fetch truck");
            }
            finally {
                setLoading(false);
            }
        };
        if (id) {
            fetchTruck();
        }
    }, [id]);

    return { truck, loading, error };
}