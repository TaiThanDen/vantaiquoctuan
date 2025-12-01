import { NextResponse } from "next/server";
import { ServiceTypeService } from "@/services/ServiceTypeService";

export async function GET() {
  try {
    const services = await ServiceTypeService.getAll();
    return NextResponse.json(services);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Server error" },
      { status: 500 }
    );
  }
}