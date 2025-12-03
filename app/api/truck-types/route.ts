import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
    try {
        const result = await db.query(`
      SELECT id, name, created_at
      FROM truck_types
      ORDER BY name ASC
    `);

        return NextResponse.json(result.rows);
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Server error" },
            { status: 500 }
        );
    }
}
