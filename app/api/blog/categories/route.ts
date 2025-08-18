// app/api/blog/categories/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // For now, return static categories since you don't have a database categories table
    // You can replace this with actual database queries later
    const categories = [
      {
        name: 'AI Solutions',
        count: 5,
        slug: 'ai-solutions'
      },
      {
        name: 'Process Automation',
        count: 3,
        slug: 'process-automation'
      },
      {
        name: 'Web Development',
        count: 4,
        slug: 'web-development'
      },
      {
        name: 'Digital Transformation',
        count: 2,
        slug: 'digital-transformation'
      },
      {
        name: 'SEO Services',
        count: 3,
        slug: 'seo-services'
      }
    ];

    return NextResponse.json({
      success: true,
      categories
    });

  } catch (error) {
    console.error('Categories API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch categories',
        categories: [] 
      },
      { status: 500 }
    );
  }
}