import { NextRequest, NextResponse } from "next/server";
import { TruckTypesService } from "@/services/TruckTypesService";

type Ctx = { params: { id: string } | Promise<{ id: string }> };

async function getId(context: Ctx) {
    const p: any = context.params;
    const params = typeof p?.then === "function" ? await p : p;
    return params?.id as string | undefined;
}

export async function GET(_req: NextRequest, context: Ctx) {
    try {
        const id = await getId(context);
        if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

        const truckType = await TruckTypesService.getById(id);
        if (!truckType) return NextResponse.json({ error: "Not found" }, { status: 404 });

        return NextResponse.json(truckType);
    } catch (error: any) {
        return NextResponse.json({ error: error?.message || "Server error" }, { status: 500 });
    }
}

export async function DELETE(_req: NextRequest, context: Ctx) {
    try {
        const id = await getId(context);
        if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

        const deleted = await TruckTypesService.deleteById(id);

        // deleted nên trả boolean hoặc rowCount > 0
        if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error?.message || "Server error" }, { status: 500 });
    }
}
