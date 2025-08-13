// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest, hashPassword } from '@/lib/auth';

// GET all users (admin only)
export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request);
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        avatar: true,
        title: true,
        createdAt: true,
        _count: {
          select: { posts: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

// CREATE new user (admin only)
export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request);
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { email, name, password, role, title, avatar } = await request.json();

    if (!email || !name || !password) {
      return NextResponse.json(
        { error: 'Email, name, and password are required' },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: role || 'AUTHOR',
        title,
        avatar
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        avatar: true,
        title: true,
        createdAt: true
      }
    });

    return NextResponse.json({ user: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}