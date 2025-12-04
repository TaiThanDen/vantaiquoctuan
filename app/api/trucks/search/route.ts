import { TrucksService } from "@/services/trucksService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const keyword = (searchParams.get("keyword") || "").trim();
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");

        if (!keyword.trim()) {
            // Nếu không có keyword, trả về tất cả
            const trucks = await TrucksService.getPaged(page, limit);
            return NextResponse.json(trucks);
        }

        const trucks = await TrucksService.search(keyword, page, limit);
        return NextResponse.json(trucks);
    } catch (error) {
        console.error("Error searching trucks:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
