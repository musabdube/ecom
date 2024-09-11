// app/api/change-password/route.ts

import { NextResponse } from 'next/server';
import { hash, compare } from 'bcryptjs';
import prisma from '../../../lib/prisma'; // Import Prisma client

export async function POST(request: Request) {
  try {
    const { currentPassword, newPassword } = await request.json();

    // Assuming you have a userId stored in session or token
    const userId = 1; // Replace with the actual userId (e.g., from session or auth middleware)

    // Fetch the user from the database
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Compare current password with the stored password
    const isMatch = await compare(currentPassword, user.password);

    if (!isMatch) {
      return NextResponse.json({ message: 'Current password is incorrect' }, { status: 400 });
    }

    // Hash the new password
    const hashedPassword = await hash(newPassword, 10);

    // Update the password in the database
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return NextResponse.json({ message: 'Password changed successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to change password' }, { status: 500 });
  }
}
