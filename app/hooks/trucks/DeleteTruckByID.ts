import { useState } from "react";
import { TruckClientService } from "@/services/trucks.client";

export function useDeleteTruck() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const deleteTruck = async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            await TruckClientService.delete(id);
            return true;
        } catch (err: any) {
            setError(err.message || "Xóa xe thất bại");
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { deleteTruck, loading, error };
}