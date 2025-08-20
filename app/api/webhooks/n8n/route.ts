import { NextRequest, NextResponse } from 'next/server';

// Webhook endpoint for n8n automation
export async function POST(request: NextRequest) {
  try {
    console.log('🔗 n8n Webhook received');
    
    // Optional: Add webhook authentication
    //const authHeader = request.headers.get('x-webhook-secret');
    //const expectedSecret = process.env.N8N_WEBHOOK_SECRET || 'your-secret-key';
    //
    //if (authHeader !== expectedSecret) {
    //  return NextResponse.json(
    //    { error: 'Unauthorized webhook' },
    //    { status: 401 }
    //  );
    //}
    
    const body = await request.json();
    console.log('🔗 n8n Data received:', body);
    
    // Validate required fields
    const requiredFields = ['title', 'excerpt', 'content'];
    const missing = requiredFields.filter(field => !body[field]);
    
    if (missing.length > 0) {
      return NextResponse.json(
        { error: 'Missing required fields', missing_fields: missing },
        { status: 400 }
      );
    }
    
    // Format data for internal API
    const postData = {
      title: body.title.trim(),
      excerpt: body.excerpt.trim(),
      content: body.content.trim(),
      categoryId: body.categoryId || 'cat_ai', // Default to AI Solutions
      authorId: body.authorId || 'author_hossein_1755215496184',
      status: body.status || 'DRAFT',
      featured: body.featured || false,
      ...(body.featuredImage && { featuredImage: body.featuredImage }),
      ...(body.metaTitle && { metaTitle: body.metaTitle }),
      ...(body.metaDescription && { metaDescription: body.metaDescription }),
      ...(body.keywords && { keywords: body.keywords })
    };
    
    // Create post via internal API
    const createResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/blog`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });
    
    if (!createResponse.ok) {
      const error = await createResponse.json();
      throw new Error(`Post creation failed: ${error.error}`);
    }
    
    const createdPost = await createResponse.json();
    
    return NextResponse.json({
      success: true,
      message: 'Post created successfully via n8n webhook',
      post: createdPost
    });
    
  } catch (error) {
    console.error('❌ n8n Webhook error:', error);
    return NextResponse.json(
      { 
        error: 'Webhook processing failed', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}