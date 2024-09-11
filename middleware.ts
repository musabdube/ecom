import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt'; // Assuming you're using NextAuth.js or JWT-based auth

// List of protected routes for Admin and Super Admin
const adminPaths = ['/admin', '/admin/products'];
const superAdminPaths = ['/admin/super'];

export async function middleware(req: NextRequest) { // Use NextRequest type here
  const url = req.nextUrl.clone();
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  // Redirect to login if no token exists
  if (!token) {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // User role from token (e.g., 'USER', 'ADMIN', 'SUPER_ADMIN')
  const userRole = token?.role;

  // Check if the user is accessing an admin route
  if (adminPaths.includes(url.pathname)) {
    if (userRole !== 'ADMIN' && userRole !== 'SUPER_ADMIN') {
      return NextResponse.redirect(new URL('/', req.url)); // Redirect to home if not authorized
    }
  }

  // Check if the user is accessing a super admin route
  if (superAdminPaths.includes(url.pathname)) {
    if (userRole !== 'SUPER_ADMIN') {
      return NextResponse.redirect(new URL('/', req.url)); // Redirect if not super admin
    }
  }

  // If the user has the correct role, continue with the request
  return NextResponse.next();
}

// Define paths where the middleware should run
export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
