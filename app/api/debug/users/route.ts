// Create: app/api/debug/users/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Import Turso client
    const { turso } = await import('@/lib/turso');
    
    // Get all users (without passwords for security)
    const users = await turso.execute({
      sql: `SELECT id, email, name, title, role, createdAt FROM User`,
      args: []
    });

    return NextResponse.json({
      status: 'SUCCESS',
      users: users.rows,
      count: users.rows.length,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    return NextResponse.json({
      status: 'ERROR',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}