import { TrucksService } from "@/services/trucksService";
import { NextResponse } from "next/server";

// Helper function to check if string is UUID
function isUUID(str: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check if it's UUID or slug
    const truck = isUUID(id)
      ? await TrucksService.getById(id)
      : await TrucksService.getBySlug(id);

    if (!truck) {
      return NextResponse.json({ error: "Truck not found" }, { status: 404 });
    }
    return NextResponse.json(truck);
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // PUT always uses UUID
    if (!isUUID(id)) {
      return NextResponse.json({ error: "Invalid truck ID" }, { status: 400 });
    }

    const data = await request.json();
    const updatedTruck = await TrucksService.update(id, data);

    if (!updatedTruck) {
      return NextResponse.json({ error: "Truck not found" }, { status: 404 });
    }

    return NextResponse.json(updatedTruck);
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // DELETE always uses UUID
    if (!isUUID(id)) {
      return NextResponse.json({ error: "Invalid truck ID" }, { status: 400 });
    }

    const deletedTruck = await TrucksService.delete(id);
    if (!deletedTruck) {
      return NextResponse.json({ error: "Truck not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Truck deleted successfully", truck: deletedTruck });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

