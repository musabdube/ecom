// app/api/admin/products/route.ts
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function GET(req: Request) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  if (!token || (token.role !== 'ADMIN' && token.role !== 'SUPER_ADMIN')) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  // Your logic for fetching products here

  return NextResponse.json({ message: 'Admin Products' });
}
