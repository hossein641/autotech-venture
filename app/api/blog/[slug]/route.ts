import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';
import { blogPostSchema } from '@/lib/validation';
import { transformPostFromDB, keywordsToString, keywordsFromString } from '@/lib/types';

// GET single post by slug or ID
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const post = await prisma.blogPost.findFirst({
      where: {
        OR: [
          { slug: params.slug },
          { id: params.slug }
        ]
      },
      include: {
        author: { select: { name: true, avatar: true, title: true } },
        category: { select: { name: true } },
        tags: { include: { tag: { select: { name: true } } } }
      }
    });

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    const transformedPost = transformPostFromDB(post);
    return NextResponse.json({ post: transformedPost });
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    );
  }
}

// UPDATE post by slug or ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const user = await getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = blogPostSchema.parse(body);

    // Find post by slug or ID
    const existingPost = await prisma.blogPost.findFirst({
      where: {
        OR: [
          { slug: params.slug },
          { id: params.slug }
        ]
      },
      include: { author: true }
    });

    if (!existingPost) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    // Check permissions
    if (user.role !== 'ADMIN' && existingPost.authorId !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Generate new slug if title changed
    let newSlug = existingPost.slug;
    if (validatedData.title !== existingPost.title) {
      newSlug = validatedData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    }

    // Calculate read time
    const readTime = Math.ceil(validatedData.content.split(' ').length / 200);

    // Update post
    const updatedPost = await prisma.blogPost.update({
      where: { id: existingPost.id },
      data: {
        title: validatedData.title,
        slug: newSlug,
        excerpt: validatedData.excerpt,
        content: validatedData.content,
        featuredImage: validatedData.featuredImage,
        categoryId: validatedData.categoryId,
        featured: validatedData.featured || false,
        status: validatedData.status || 'DRAFT',
        publishedAt: validatedData.status === 'PUBLISHED' 
          ? validatedData.publishedAt ? new Date(validatedData.publishedAt) : new Date()
          : null,
        readTime,
        metaTitle: validatedData.metaTitle,
        metaDescription: validatedData.metaDescription,
        keywords: keywordsToString(validatedData.keywords || []),
        updatedAt: new Date(),
        // Update tags if provided
        tags: validatedData.tagIds ? {
          deleteMany: {},
          create: validatedData.tagIds.map(tagId => ({ tagId }))
        } : undefined
      },
      include: {
        author: { select: { name: true, avatar: true, title: true } },
        category: { select: { name: true } },
        tags: { include: { tag: { select: { name: true } } } }
      }
    });

    const transformedPost = transformPostFromDB(updatedPost);
    return NextResponse.json({ post: transformedPost });
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    );
  }
}

// DELETE post by slug or ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const user = await getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Find post by slug or ID
    const existingPost = await prisma.blogPost.findFirst({
      where: {
        OR: [
          { slug: params.slug },
          { id: params.slug }
        ]
      },
      include: { author: true }
    });

    if (!existingPost) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    // Check permissions
    if (user.role !== 'ADMIN' && existingPost.authorId !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Delete post (cascade deletes tags relationships)
    await prisma.blogPost.delete({
      where: { id: existingPost.id }
    });

    return NextResponse.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    );
  }
}