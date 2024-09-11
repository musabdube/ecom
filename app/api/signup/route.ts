// app/api/signup/route.ts
import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { hash } from 'bcryptjs';

// POST /api/signup
export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    // Check if the email is already in use
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Create a new user
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    });

    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
