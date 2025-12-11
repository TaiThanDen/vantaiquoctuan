import { NextResponse } from "next/server";
import { ServiceTypeService } from "@/services/ServiceTypeService";

type Ctx = { params: { id: string } | Promise<{ id: string }> };

async function getId(context: Ctx) {
    const p: any = context.params;
    const params = typeof p?.then === "function" ? await p : p;
    return params?.id as string | undefined;
}

export async function GET(_req: Request, context: Ctx) {
    try {
        const id = await getId(context);
        if (!id)
            return NextResponse.json({ error: "Missing id" }, { status: 400 });

        const serviceType = await ServiceTypeService.getById(id);
        if (!serviceType)
            return NextResponse.json({ error: "Not found" }, { status: 404 });

        return NextResponse.json(serviceType);
    } catch (error: any) {
        return NextResponse.json(
            { error: error?.message || "Server error" },
            { status: 500 }
        );
    }
}

export async function DELETE(_req: Request, context: Ctx) {
    try {
        const id = await getId(context);
        if (!id)
            return NextResponse.json({ error: "Missing id" }, { status: 400 });

        const deleted = await ServiceTypeService.deleteById(id);

        // deleted nên trả boolean hoặc rowCount > 0
        if (!deleted)
            return NextResponse.json({ error: "Not found" }, { status: 404 });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json(
            { error: error?.message || "Server error" },
            { status: 500 }
        );
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
                { error: "Tên loại dịch vụ không hợp lệ" },
                { status: 400 }
            );
        }
        const updatedServiceType = await ServiceTypeService.update(id, name);
        if (!updatedServiceType) {
            return NextResponse.json(
                { error: "Loại dịch vụ không tồn tại" },
                { status: 404 }
            );
        }
        return NextResponse.json(updatedServiceType);
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Server error" },
            { status: 500 }
        );
    }
}