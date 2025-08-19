// app/api/debug/categories/route.ts - Create this new file

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@libsql/client';

export async function GET(request: NextRequest) {
  try {
    const DATABASE_URL = process.env.DATABASE_URL;
    const TURSO_AUTH_TOKEN = process.env.TURSO_AUTH_TOKEN;
    
    if (!DATABASE_URL || !TURSO_AUTH_TOKEN) {
      return NextResponse.json({ error: 'Database not configured' });
    }

    const turso = createClient({
      url: DATABASE_URL,
      authToken: TURSO_AUTH_TOKEN
    });

    // Get all categories
    const categoriesResult = await turso.execute({
      sql: 'SELECT * FROM Category ORDER BY name',
      args: []
    });

    // Get all users for reference
    const usersResult = await turso.execute({
      sql: 'SELECT id, name, email FROM User',
      args: []
    });

    return NextResponse.json({
      status: 'SUCCESS',
      categories: categoriesResult.rows,
      users: usersResult.rows,
      categoryCount: categoriesResult.rows.length,
      userCount: usersResult.rows.length
    });

  } catch (error) {
    return NextResponse.json({
      status: 'ERROR',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}