import { NextResponse } from "next/server";
import { ServiceTypeService } from "@/services/ServiceTypeService";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const keyword = searchParams.get("keyword") || "";
    const services = await ServiceTypeService.getAll(page, limit, keyword);
    return NextResponse.json(services);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Server error" },
      { status: 500 }
    );
  }
}
export async function POST(request: Request) {
  try {
    const { name } = await request.json();
    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { error: "Tên loại dịch vụ không hợp lệ" },
        { status: 400 }
      );
    }
    const newServiceType = await ServiceTypeService.create(name);
    return NextResponse.json(newServiceType, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Server error" },
      { status: 500 }
    );
  }
}