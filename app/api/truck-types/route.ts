import { NextResponse } from "next/server";
import { TruckTypesService } from "@/services/TruckTypesService";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get("page") || "1", 10);
        const limit = parseInt(searchParams.get("limit") || "100", 10);

        const truckTypes = await TruckTypesService.getAll(page, limit);

        return NextResponse.json(truckTypes);
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Server error" },
            { status: 500 }
        );
    }
}
