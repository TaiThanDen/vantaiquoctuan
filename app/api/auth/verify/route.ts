import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "@/services/auth";

export async function GET(request: NextRequest) {
    const user = verifyAuth(request);
    
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    return NextResponse.json({ user });
}