import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Ensure Prisma client is properly set up

export async function GET(req: Request) {
  const userId = 1; // Get userId from the session (use NextAuth or custom auth middleware)

  const userProfile = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      cartItems: {
        include: {
          product: true,
        },
      },
      likedItems: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!userProfile) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  return NextResponse.json(userProfile);
}
