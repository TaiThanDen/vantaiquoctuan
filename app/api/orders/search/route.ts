import { NextRequest, NextResponse } from "next/server";
import { OrderService } from "@/services/OrderService";

export async function GET(req: NextRequest) {
    try {
        const sp = req.nextUrl.searchParams;

        const query = (sp.get("query") ?? "").trim();
        const limit = Math.min(parseInt(sp.get("limit") ?? "10", 10) || 10, 100);
        const offset = Math.max(parseInt(sp.get("offset") ?? "0", 10) || 0, 0);

        if (!query) return NextResponse.json([]);

        const orders = await OrderService.search(query, limit, offset);
        return NextResponse.json(orders);
    } catch (e) {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
