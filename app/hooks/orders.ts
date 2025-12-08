"use client";

import { useCallback, useEffect, useState } from "react";
import { useMemo } from "react";
import { useRef } from "react";
import { OrderClientService } from "../../services/order.client";

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

export function useOrderSearch(limitDefault = 10) {
    const [keyword, setKeyword] = useState("");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(limitDefault);

    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const debounceRef = useRef<number | null>(null);

    const hasKeyword = useMemo(() => keyword.trim().length > 0, [keyword]);
    const offset = useMemo(() => (page - 1) * limit, [page, limit]);

    useEffect(() => {
        if (!hasKeyword) {
            setResults([]);
            setLoading(false);
            setError(null);
            return;
        }

        setLoading(true);
        setError(null);

        if (debounceRef.current) window.clearTimeout(debounceRef.current);

        debounceRef.current = window.setTimeout(async () => {
            try {
                const data = await OrderClientService.search(keyword.trim(), limit, offset);
                setResults(Array.isArray(data) ? data : []);
            } catch (e: any) {
                setError(e?.message || "Search failed");
                setResults([]);
            } finally {
                setLoading(false);
            }
        }, 250);

        return () => {
            if (debounceRef.current) window.clearTimeout(debounceRef.current);
        };
    }, [keyword, page, limit, hasKeyword]);

    const clear = () => {
        setKeyword("");
        setPage(1);
        setResults([]);
        setError(null);
        setLoading(false);
    };

    // khi đổi keyword -> reset page về 1 (UX tốt hơn)
    const setKeywordAndResetPage = (v: string) => {
        setKeyword(v);
        setPage(1);
    };

    return {
        keyword,
        setKeyword: setKeywordAndResetPage,
        clear,

        page,
        setPage,
        limit,
        setLimit,

        results,
        loading,
        error,
        hasKeyword,
        offset,
    };
}


