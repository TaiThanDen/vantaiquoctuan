import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { mkdir, writeFile } from "fs/promises";
import crypto from "crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Giới hạn 5MB
const MAX_SIZE = 5 * 1024 * 1024;
const ALLOWED = new Set([
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/jpg",
]);

function getBaseUrl(req: NextRequest) {
    const envBase = process.env.PUBLIC_BASE_URL?.trim();
    if (envBase) return envBase.replace(/\/+$/, "");

    const proto = req.headers.get("x-forwarded-proto") || "http";
    const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
    return `${proto}://${host}`;
}

export async function POST(req: NextRequest) {
    try {
        const form = await req.formData();
        const file = form.get("file");

        if (!(file instanceof File)) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        if (!ALLOWED.has(file.type)) {
            return NextResponse.json(
                { error: "Invalid file type" },
                { status: 400 }
            );
        }

        if (file.size > MAX_SIZE) {
            return NextResponse.json(
                { error: "File too large (max 5MB)" },
                { status: 400 }
            );
        }
        const uploadRoot =
            process.env.UPLOAD_DIR?.trim() || path.join(process.cwd(), "public/uploads");

        const folder = path.join(uploadRoot, "trucks");
        await mkdir(folder, { recursive: true });

        const ext =
            file.type === "image/jpeg" ? "jpg" :
                file.type === "image/png" ? "png" :
                    file.type === "image/webp" ? "webp" : "jpg";

        const name = `${crypto.randomUUID?.() ?? crypto.randomBytes(16).toString("hex")}.${ext}`;
        const filePath = path.join(folder, name);

        const bytes = await file.arrayBuffer();
        await writeFile(filePath, Buffer.from(bytes));

        const baseUrl = getBaseUrl(req);
        const url = `${baseUrl}/uploads/trucks/${name}`;

        return NextResponse.json({ url }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
    }
}
