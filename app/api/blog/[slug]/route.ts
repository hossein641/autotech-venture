// app/api/blog/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { transformPostFromDB } from '@/lib/types';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    // Find post by slug or ID (for flexibility)
    const post = await prisma.blogPost.findFirst({
      where: {
        OR: [
          { slug: slug },
          { id: slug }
        ],
        status: 'PUBLISHED' // Only show published posts
      },
      include: {
        author: {
          select: { 
            name: true, 
            avatar: true, 
            title: true 
          }
        },
        category: {
          select: { 
            name: true, 
            slug: true,  // ✅ Added missing slug field
            color: true 
          }
        },
        tags: {
          include: {
            tag: {
              select: { 
                name: true,
                slug: true 
              }
            }
          }
        }
      }
    });

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    const transformedPost = transformPostFromDB(post);
    return NextResponse.json(transformedPost);

  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}

// PATCH route for updating posts (optional - for CMS)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const updateData = await request.json();

    const updatedPost = await prisma.blogPost.update({
      where: { slug },
      data: updateData,
      include: {
        author: {
          select: { 
            name: true, 
            avatar: true, 
            title: true 
          }
        },
        category: {
          select: { 
            name: true, 
            slug: true,  // ✅ Added missing slug field
            color: true 
          }
        },
        tags: {
          include: {
            tag: {
              select: { 
                name: true,
                slug: true 
              }
            }
          }
        }
      }
    });

    const transformedPost = transformPostFromDB(updatedPost);
    return NextResponse.json(transformedPost);

  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to update blog post' },
      { status: 500 }
    );
  }
}