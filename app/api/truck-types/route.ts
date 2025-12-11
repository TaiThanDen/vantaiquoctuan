import { NextRequest, NextResponse } from "next/server";
import { TruckTypesService } from "@/services/TruckTypesService";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get("page") || "1", 10);
        const limit = parseInt(searchParams.get("limit") || "10", 10);
        const keyword = searchParams.get("keyword") || "";

        const data = await TruckTypesService.getAll(page, limit, keyword);
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json(
            { error: error?.message || "Server error" },
            { status: 500 }
        );
    }
}
export async function POST(request: Request) {
    try {
        const { name } = await request.json();
        if (!name || typeof name !== "string") {
            return NextResponse.json(
                { error: "Tên loại xe không hợp lệ" },
                { status: 400 }
            );
        }
        const newTruckType = await TruckTypesService.create(name);
        return NextResponse.json(newTruckType, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Server error" },
            { status: 500 }
        );
    }
}

