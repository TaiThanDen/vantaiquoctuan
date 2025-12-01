import { useState, useEffect } from "react";
import { OrderClientService } from "@/services/order.client";

export function useOrders() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const data = await OrderClientService.getAll();
                setOrders(data);
            }catch (err) {
                setError(err instanceof Error ? err.message : "Failed to fetch orders");
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);
    return { orders, loading, error };
};