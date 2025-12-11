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
export async function PUT(request: Request, context: { params: { id: string } } | { params: Promise<{ id: string }> }) {
    try {
        const p: any = (context as any).params;
        const params = typeof p?.then === "function" ? await p : p;
        const id = params?.id;
        const { name } = await request.json();
        if (!name || typeof name !== "string") {
            return NextResponse.json(
                { error: "Tên loại xe không hợp lệ" },
                { status: 400 }
            );
        }
        const updatedTruckType = await TruckTypesService.update(id, name);
        if (!updatedTruckType) {
            return NextResponse.json(
                { error: "Loại xe không tồn tại" },
                { status: 404 }
            );
        }
        return NextResponse.json(updatedTruckType);
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Server error" },
            { status: 500 }
        );
    }
}