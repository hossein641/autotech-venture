import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function GET(request: NextRequest) {
  try {
    // Import Turso client
    const { turso } = await import('@/lib/turso');
    
    // Hash a default password
    const hashedPassword = await bcrypt.hash('AdminPass123!', 12);
    
    // Update the admin user
    await turso.execute({
      sql: `UPDATE User SET password = ? WHERE email = 'admin@atechv.com'`,
      args: [hashedPassword]
    });

    return NextResponse.json({
      success: true,
      message: 'Admin password updated to: AdminPass123!',
      email: 'admin@atechv.com'
    });

  } catch (error) {
    console.error('Fix admin error:', error);
    return NextResponse.json(
      { error: 'Failed to update admin password' },
      { status: 500 }
    );
  }
}