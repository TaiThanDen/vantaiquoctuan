"use client";

import { useCallback, useEffect, useState } from "react";

export function useOrders(page = 1, limit = 10) {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);

    const fetchOrders = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`/api/orders?page=${page}&limit=${limit}`, { cache: "no-store" });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data?.error || `HTTP ${res.status}`);
            }
            const list = Array.isArray(data) ? data : Array.isArray(data?.orders) ? data.orders : [];
            setOrders(list);
        } catch (e) {
            setError(e);
            setOrders([]);
        } finally {
            setLoading(false);
        }
    }, [page, limit]);
    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);
    const refetch = useCallback(async () => {
        await fetchOrders();
    }, [fetchOrders]);
    return { orders, loading, error, refetch };
}

