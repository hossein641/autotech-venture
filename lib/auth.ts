import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { NextRequest } from 'next/server';
import { prisma } from './prisma';

// ✅ Fixed: Ensure JWT_SECRET is always a string
const JWT_SECRET = (process.env.JWT_SECRET || 'development-secret-change-in-production') as string;

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export function generateToken(payload: JWTPayload): string {
  return jwt.sign(
    payload, 
    JWT_SECRET, 
    { expiresIn: '7d' } as jwt.SignOptions
  );
}

export function verifyToken(token: string): JWTPayload {
  // ✅ Fixed: Proper type handling for jwt.verify
  const decoded = jwt.verify(token, JWT_SECRET);
  return decoded as JWTPayload;
}

export async function getUserFromRequest(request: NextRequest) {
  try {
    const authorization = request.headers.get('authorization');
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return null;
    }

    const token = authorization.split(' ')[1];
    const payload = verifyToken(token);
    
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, email: true, name: true, role: true }
    });

    return user;
  } catch (error) {
    return null;
  }
}

export function requireAuth(allowedRoles?: string[]) {
  return async (request: NextRequest) => {
    const user = await getUserFromRequest(request);
    
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    return user;
  };
}