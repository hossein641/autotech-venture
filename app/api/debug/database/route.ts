// Create: app/api/debug/database/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Import Turso client
    const { turso } = await import('@/lib/turso');
    
    // Test database connection
    const testConnection = await turso.execute('SELECT 1 as test');
    
    // Get posts count
    const postsCount = await turso.execute('SELECT COUNT(*) as count FROM BlogPost');
    
    // Get latest posts with details
    const latestPosts = await turso.execute({
      sql: `SELECT id, title, slug, authorId, createdAt, status FROM BlogPost ORDER BY createdAt DESC LIMIT 3`,
      args: []
    });
    
    // Get users count  
    const usersCount = await turso.execute('SELECT COUNT(*) as count FROM User');
    
    // Get categories count
    const categoriesCount = await turso.execute('SELECT COUNT(*) as count FROM Category');

    return NextResponse.json({
      status: 'SUCCESS',
      database: 'Turso Cloud SQLite',
      connection: testConnection.rows[0],
      stats: {
        posts: postsCount.rows[0]?.count || 0,
        users: usersCount.rows[0]?.count || 0,
        categories: categoriesCount.rows[0]?.count || 0
      },
      latestPosts: latestPosts.rows,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    return NextResponse.json({
      status: 'ERROR',
      database: 'Connection Failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      fallback: 'Using sample data',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}