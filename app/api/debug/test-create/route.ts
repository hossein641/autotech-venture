// 3. DEBUG ENDPOINT TO TEST EXACT ADMIN DATA
// Create: app/api/debug/test-create/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('🧪 DEBUG TEST CREATE - Received request');
    
    const body = await request.json();
    console.log('🧪 DEBUG: Raw body:', body);
    console.log('🧪 DEBUG: Body keys:', Object.keys(body));
    console.log('🧪 DEBUG: Body types:', Object.fromEntries(
      Object.entries(body).map(([key, value]) => [key, typeof value])
    ));

    // Simulate the exact same validation logic as your main API
    const requiredFields = ['title', 'excerpt', 'content', 'categoryId', 'authorId'];
    const missing = requiredFields.filter(field => !body[field]);
    
    if (missing.length > 0) {
      return NextResponse.json({
        error: 'Missing required fields',
        details: { missing_fields: missing }
      }, { status: 400 });
    }

    // Check field lengths
    const validation = {
      title: body.title?.length >= 10 && body.title?.length <= 500,
      excerpt: body.excerpt?.length >= 50 && body.excerpt?.length <= 300,
      content: body.content?.length >= 100,
      categoryId: typeof body.categoryId === 'string' && body.categoryId.length > 0,
      authorId: typeof body.authorId === 'string' && body.authorId.length > 0
    };

    const invalid = Object.entries(validation)
      .filter(([_, isValid]) => !isValid)
      .map(([field]) => field);

    if (invalid.length > 0) {
      return NextResponse.json({
        error: 'Field validation failed',
        details: { 
          invalid_fields: invalid,
          field_lengths: {
            title: body.title?.length || 0,
            excerpt: body.excerpt?.length || 0,
            content: body.content?.length || 0
          }
        }
      }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: 'All validations passed!',
      received_data: body
    });

  } catch (error) {
    console.error('🧪 DEBUG ERROR:', error);
    return NextResponse.json({
      error: 'Debug endpoint error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
