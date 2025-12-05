import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export function proxy(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    if (!token) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    try {
        jwt.verify(token, JWT_SECRET as string);
        return NextResponse.next();
    } catch (error) {
        const response = NextResponse.redirect(new URL('/admin/login', request.url));
        response.cookies.delete('token');
        return response;
    }
}

export const config = {
    matcher: [
        '/admin((?!/login).*)',
    ],
};