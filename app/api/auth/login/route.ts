// app/api/auth/login/route.ts - Fixed for Production
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { generateToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Check if we're in production and should use Turso
    const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL_ENV === 'production';
    
    let user;
    
    if (isProduction) {
      // Use Turso for production authentication
      user = await authenticateWithTurso(email, password);
    } else {
      // Use Prisma for local development
      user = await authenticateWithPrisma(email, password);
    }

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role
    });

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}

// Production authentication with Turso
async function authenticateWithTurso(email: string, password: string) {
  try {
    const { turso } = await import('@/lib/turso');
    
    // Find user by email
    const result = await turso.execute({
      sql: 'SELECT id, email, name, role, password FROM User WHERE email = ?',
      args: [email]
    });

    if (result.rows.length === 0) {
      console.log('User not found:', email);
      return null;
    }

    const user = result.rows[0];
    console.log('Found user:', { email: user.email, role: user.role });
    
    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password as string);
    console.log('Password valid:', isValidPassword);
    
    if (!isValidPassword) {
      return null;
    }

    return {
      id: user.id as string,
      email: user.email as string,
      name: user.name as string,
      role: user.role as string
    };

  } catch (error) {
    console.error('Turso authentication error:', error);
    return null;
  }
}

// Local development authentication with Prisma
async function authenticateWithPrisma(email: string, password: string) {
  try {
    const { prisma } = await import('@/lib/prisma');
    
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        password: true
      }
    });

    if (!user) {
      return null;
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    };

  } catch (error) {
    console.error('Prisma authentication error:', error);
    return null;
  }
}