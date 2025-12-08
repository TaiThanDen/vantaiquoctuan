import { NextRequest, NextResponse } from "next/server";
import { OrderService } from "@/services/OrderService";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const order = await OrderService.getById(id);
        if (!order) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }
        return NextResponse.json(order);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const body = await req.json();
        const order = await OrderService.update(id, body);
        if (!order) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }
        return NextResponse.json(order);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const order = await OrderService.delete(id);
        if (!order) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }
        return NextResponse.json(order);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}