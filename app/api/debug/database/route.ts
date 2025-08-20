// app/api/debug/database/route.ts - Debug endpoint to check actual database structure
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@libsql/client';

const DATABASE_URL = process.env.DATABASE_URL;
const TURSO_AUTH_TOKEN = process.env.TURSO_AUTH_TOKEN;

const turso = createClient({
  url: DATABASE_URL!,
  authToken: TURSO_AUTH_TOKEN!
});

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 DEBUG: Checking database structure...');

    // Get all categories
    const categoriesResult = await turso.execute({
      sql: 'SELECT id, name, slug FROM Category ORDER BY name'
    });

    // Get all users/authors
    const usersResult = await turso.execute({
      sql: 'SELECT id, name, email, role FROM User ORDER BY name'
    });

    // Get existing posts to see what IDs they use
    const postsResult = await turso.execute({
      sql: 'SELECT id, title, slug, categoryId, authorId, status FROM BlogPost LIMIT 5'
    });

    // Format the results
    const categories = categoriesResult.rows.map(row => ({
      id: String(row.id),
      name: String(row.name),
      slug: String(row.slug)
    }));

    const users = usersResult.rows.map(row => ({
      id: String(row.id),
      name: String(row.name),
      email: String(row.email),
      role: String(row.role)
    }));

    const posts = postsResult.rows.map(row => ({
      id: String(row.id),
      title: String(row.title),
      slug: String(row.slug),
      categoryId: String(row.categoryId),
      authorId: String(row.authorId),
      status: String(row.status)
    }));

    const response = {
      timestamp: new Date().toISOString(),
      database: 'Turso SQLite',
      tables: {
        categories: {
          count: categories.length,
          data: categories
        },
        users: {
          count: users.length,
          data: users
        },
        posts: {
          count: posts.length,
          data: posts
        }
      },
      categoryMapping: {
        current: categories.reduce((map, cat) => {
          map[cat.name] = cat.id;
          return map;
        }, {} as Record<string, string>)
      },
      authorMapping: {
        current: users.reduce((map, user) => {
          map[user.name] = user.id;
          return map;
        }, {} as Record<string, string>)
      }
    };

    console.log('✅ DEBUG: Database structure retrieved successfully');
    
    return NextResponse.json(response, { 
      status: 200,
      headers: {
        'Cache-Control': 'no-cache'
      }
    });

  } catch (error) {
    console.error('❌ DEBUG: Error checking database structure:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to check database structure', 
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}