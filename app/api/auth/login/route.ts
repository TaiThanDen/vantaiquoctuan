import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(request: NextRequest) {
    try {
        const { username, password } = await request.json();

        const result = await db.query("SELECT * FROM users WHERE username = $1", [username]);
        const admin = result.rows[0];

        if (!admin) {
            return NextResponse.json({ error: "Tài khoản không tồn tại" }, { status: 401 });
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password_hash);
        if (!isPasswordValid) {
            return NextResponse.json({ error: "Mật khẩu không đúng" }, { status: 401 });
        }

        if (!JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined");
        }

        const token = jwt.sign(
            { id: admin.id, username: admin.username },
            JWT_SECRET,
            { expiresIn: "7d" }
        );

        return NextResponse.json({ token });
    } catch (error) {
        console.error("Lỗi đăng nhập", error);
        return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
    }
}