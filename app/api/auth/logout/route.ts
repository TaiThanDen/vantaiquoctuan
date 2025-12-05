import { NextResponse } from "next/server";

export async function POST() {
    const response = NextResponse.json({ message: "Đăng xuất thành công" });
    
    // Xóa cookie
    response.cookies.delete('token');
    
    return response;
}