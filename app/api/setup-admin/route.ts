import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    // Only allow this with special key
    const setupKey = request.headers.get('x-setup-key');
    if (setupKey !== 'setup-admin-2025') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { email, password, name } = await request.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      );
    }

    // Import Turso client
    const { turso } = await import('@/lib/turso');
    
    // Hash the password properly
    const hashedPassword = await bcrypt.hash(password, 12);

    // Update existing user
    await turso.execute({
      sql: `UPDATE User SET email = ?, name = ?, password = ?, role = 'ADMIN' WHERE name = 'Dr. Hossein Mohammadi'`,
      args: [email, name, hashedPassword]
    });

    return NextResponse.json({
      success: true,
      message: 'Admin user updated successfully',
      user: { email, name, role: 'ADMIN' }
    });

  } catch (error) {
    console.error('Setup admin error:', error);
    return NextResponse.json(
      { error: 'Failed to setup admin user' },
      { status: 500 }
    );
  }
}