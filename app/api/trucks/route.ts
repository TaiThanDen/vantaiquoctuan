import { NextResponse } from "next/server";
import { TrucksService } from "@/services/trucksService";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  try {
    const trucks = await TrucksService.getPaged(page, limit);
    return NextResponse.json(trucks);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const truck = await TrucksService.create(body);
    return NextResponse.json(truck, { status: 201 });
  } catch (error) {
    console.error("Error creating truck:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Server error" },
      { status: 500 }
    );
  }
}

