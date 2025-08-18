// lib/database.ts - Single source of truth for database connections
import { turso } from './turso';
import { prisma } from './prisma';

// Determine which database to use based on environment
const USE_TURSO = process.env.DATABASE_URL?.startsWith('libsql://') || 
                  process.env.NODE_ENV === 'production';

console.log('🔍 Database Configuration:', {
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL_TYPE: process.env.DATABASE_URL?.split('://')[0],
  USING_TURSO: USE_TURSO,
  TIMESTAMP: new Date().toISOString()
});

export const dbClient = USE_TURSO ? 'turso' : 'prisma';

// Unified blog post queries
export async function getBlogPosts(filters: any = {}, pagination: any = {}) {
  const page = pagination.page || 1;
  const limit = pagination.limit || 10;
  
  console.log('🔍 getBlogPosts called with:', { filters, pagination, dbClient });
  
  if (USE_TURSO) {
    // Use Turso for production
    let sql = `
      SELECT 
        bp.id, bp.slug, bp.title, bp.excerpt, bp.content, bp.featuredImage,
        bp.publishedAt, bp.readTime, bp.featured, bp.status, bp.metaTitle, 
        bp.metaDescription, bp.keywords, bp.createdAt, bp.updatedAt,
        u.name as authorName, u.avatar as authorAvatar, u.title as authorTitle,
        c.name as categoryName, c.slug as categorySlug, c.color as categoryColor
      FROM BlogPost bp
      JOIN User u ON bp.authorId = u.id
      JOIN Category c ON bp.categoryId = c.id
      WHERE 1=1
    `;
    
    const args: any[] = [];
    
    // Add status filtering - default to PUBLISHED for public API
    if (filters.status) {
      sql += ` AND bp.status = ?`;
      args.push(filters.status);
    } else {
      sql += ` AND bp.status = 'PUBLISHED'`;
    }
    
    if (filters.search) {
      sql += ` AND (bp.title LIKE ? OR bp.excerpt LIKE ? OR bp.content LIKE ?)`;
      const searchTerm = `%${filters.search}%`;
      args.push(searchTerm, searchTerm, searchTerm);
    }
    
    if (filters.category) {
      sql += ` AND c.slug = ?`;
      args.push(filters.category);
    }
    
    if (filters.featured !== undefined) {
      sql += ` AND bp.featured = ?`;
      args.push(filters.featured ? 1 : 0);
    }

    if (filters.authorId) {
      sql += ` AND bp.authorId = ?`;
      args.push(filters.authorId);
    }
    
    // Add ordering based on sortBy parameter
    if (pagination.sortBy === 'publishedAt') {
      sql += ` ORDER BY bp.publishedAt ${pagination.sortOrder || 'DESC'}`;
    } else if (pagination.sortBy === 'createdAt') {
      sql += ` ORDER BY bp.createdAt ${pagination.sortOrder || 'DESC'}`;
    } else if (pagination.sortBy === 'updatedAt') {
      sql += ` ORDER BY bp.updatedAt ${pagination.sortOrder || 'DESC'}`;
    } else {
      sql += ` ORDER BY bp.publishedAt DESC`;
    }
    
    sql += ` LIMIT ? OFFSET ?`;
    args.push(limit, (page - 1) * limit);
    
    console.log('🔍 Turso Query:', { sql, args });
    
    const result = await turso.execute({ sql, args });
    
    console.log('🔍 Turso Result Count:', result.rows.length);
    
    const transformedPosts = result.rows.map(row => ({
      id: String(row.id),
      slug: String(row.slug),
      title: String(row.title),
      excerpt: String(row.excerpt),
      content: String(row.content),
      featuredImage: row.featuredImage ? String(row.featuredImage) : null,
      publishedAt: row.publishedAt ? String(row.publishedAt) : null,
      updatedAt: row.updatedAt ? String(row.updatedAt) : null,
      readTime: Number(row.readTime) || 5,
      featured: Boolean(row.featured),
      status: String(row.status),
      author: {
        name: String(row.authorName),
        avatar: row.authorAvatar ? String(row.authorAvatar) : '/images/team/hossein.jpg',
        title: row.authorTitle ? String(row.authorTitle) : null
      },
      category: String(row.categoryName),
      tags: [],
      seo: {
        metaTitle: row.metaTitle ? String(row.metaTitle) : null,
        metaDescription: row.metaDescription ? String(row.metaDescription) : null,
        keywords: row.keywords ? JSON.parse(String(row.keywords)) : []
      }
    }));

    // Get total count for pagination
    let countSql = `SELECT COUNT(*) as total FROM BlogPost bp`;
    const countArgs: any[] = [];
    
    if (filters.category || filters.search || filters.featured !== undefined || filters.authorId || filters.status) {
      countSql += ` JOIN User u ON bp.authorId = u.id JOIN Category c ON bp.categoryId = c.id WHERE 1=1`;
      
      if (filters.status) {
        countSql += ` AND bp.status = ?`;
        countArgs.push(filters.status);
      } else {
        countSql += ` AND bp.status = 'PUBLISHED'`;
      }
      
      if (filters.search) {
        countSql += ` AND (bp.title LIKE ? OR bp.excerpt LIKE ? OR bp.content LIKE ?)`;
        const searchTerm = `%${filters.search}%`;
        countArgs.push(searchTerm, searchTerm, searchTerm);
      }
      
      if (filters.category) {
        countSql += ` AND c.slug = ?`;
        countArgs.push(filters.category);
      }
      
      if (filters.featured !== undefined) {
        countSql += ` AND bp.featured = ?`;
        countArgs.push(filters.featured ? 1 : 0);
      }
      
      if (filters.authorId) {
        countSql += ` AND bp.authorId = ?`;
        countArgs.push(filters.authorId);
      }
    } else {
      countSql += ` WHERE bp.status = 'PUBLISHED'`;
    }

    const countResult = await turso.execute({ sql: countSql, args: countArgs });
    const totalCount = Number(countResult.rows[0]?.total) || 0;
    
    return { posts: transformedPosts, totalCount };
    
  } else {
    // Use Prisma for local development
    const where: any = {};
    
    // Default to published posts unless specifically requested
    if (filters.status) {
      where.status = filters.status;
    } else {
      where.status = 'PUBLISHED';
    }
    
    if (filters.search) {
      where.OR = [
        { title: { contains: filters.search } },
        { excerpt: { contains: filters.search } },
        { content: { contains: filters.search } },
      ];
    }
    
    if (filters.category) {
      where.category = { slug: filters.category };
    }
    
    if (filters.featured !== undefined) {
      where.featured = filters.featured;
    }

    if (filters.authorId) {
      where.authorId = filters.authorId;
    }
    
    // Build order by clause
    const orderBy: any = {};
    if (pagination.sortBy === 'publishedAt') {
      orderBy.publishedAt = pagination.sortOrder || 'desc';
    } else if (pagination.sortBy === 'createdAt') {
      orderBy.createdAt = pagination.sortOrder || 'desc';
    } else if (pagination.sortBy === 'updatedAt') {
      orderBy.updatedAt = pagination.sortOrder || 'desc';
    } else {
      orderBy.publishedAt = 'desc';
    }
    
    console.log('🔍 Prisma Query:', { where, orderBy });
    
    const [posts, totalCount] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        include: {
          author: { select: { name: true, avatar: true, title: true } },
          category: { select: { name: true, slug: true, color: true } },
          tags: { include: { tag: { select: { name: true, slug: true } } } }
        },
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.blogPost.count({ where })
    ]);
    
    console.log('🔍 Prisma Result Count:', posts.length);
    
    // Transform to consistent format
    const transformedPosts = posts.map((post: any) => ({
      id: post.id,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      featuredImage: post.featuredImage,
      publishedAt: post.publishedAt?.toISOString() || null,
      updatedAt: post.updatedAt?.toISOString() || null,
      readTime: post.readTime,
      featured: post.featured,
      status: post.status,
      author: {
        name: post.author.name,
        avatar: post.author.avatar || '/images/team/hossein.jpg',
        title: post.author.title
      },
      category: post.category.name,
      tags: post.tags.map((t: any) => t.tag.name),
      seo: {
        metaTitle: post.metaTitle,
        metaDescription: post.metaDescription,
        keywords: post.keywords ? JSON.parse(post.keywords) : []
      }
    }));
    
    return { posts: transformedPosts, totalCount };
  }
}

export async function getBlogPostBySlug(slug: string) {
  console.log('🔍 getBlogPostBySlug called with:', { slug, dbClient });
  
  if (USE_TURSO) {
    const sql = `
      SELECT 
        bp.*, 
        u.name as authorName, u.avatar as authorAvatar, u.title as authorTitle,
        c.name as categoryName, c.slug as categorySlug
      FROM BlogPost bp
      JOIN User u ON bp.authorId = u.id
      JOIN Category c ON bp.categoryId = c.id
      WHERE (bp.slug = ? OR bp.id = ?) AND bp.status = 'PUBLISHED'
      LIMIT 1
    `;
    
    const result = await turso.execute({ 
      sql, 
      args: [slug, slug] 
    });
    
    if (result.rows.length === 0) return null;
    
    const row = result.rows[0];
    return {
      id: String(row.id),
      slug: String(row.slug),
      title: String(row.title),
      excerpt: String(row.excerpt),
      content: String(row.content),
      featuredImage: row.featuredImage ? String(row.featuredImage) : null,
      publishedAt: row.publishedAt ? String(row.publishedAt) : null,
      updatedAt: row.updatedAt ? String(row.updatedAt) : null,
      readTime: Number(row.readTime) || 5,
      featured: Boolean(row.featured),
      status: String(row.status), // Ensure status is always included
      author: {
        name: String(row.authorName),
        avatar: row.authorAvatar ? String(row.authorAvatar) : '/images/team/hossein.jpg',
        title: row.authorTitle ? String(row.authorTitle) : null
      },
      category: String(row.categoryName),
      tags: [],
      seo: {
        metaTitle: row.metaTitle ? String(row.metaTitle) : null,
        metaDescription: row.metaDescription ? String(row.metaDescription) : null,
        keywords: row.keywords ? JSON.parse(String(row.keywords)) : []
      }
    };
    
  } else {
    const post = await prisma.blogPost.findFirst({
      where: {
        OR: [{ slug }, { id: slug }],
        status: 'PUBLISHED'
      },
      include: {
        author: { select: { name: true, avatar: true, title: true } },
        category: { select: { name: true, slug: true, color: true } },
        tags: { include: { tag: { select: { name: true, slug: true } } } }
      }
    });

    if (!post) return null;

    // Transform to consistent format
    return {
      id: post.id,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      featuredImage: post.featuredImage,
      publishedAt: post.publishedAt?.toISOString() || null,
      updatedAt: post.updatedAt?.toISOString() || null,
      readTime: post.readTime,
      featured: post.featured,
      status: post.status, // Include status from Prisma result
      author: {
        name: post.author.name,
        avatar: post.author.avatar || '/images/team/hossein.jpg',
        title: post.author.title
      },
      category: post.category.name,
      tags: post.tags.map((t: any) => t.tag.name),
      seo: {
        metaTitle: post.metaTitle,
        metaDescription: post.metaDescription,
        keywords: post.keywords ? JSON.parse(post.keywords) : []
      }
    };
  }
}

export async function createBlogPost(data: any) {
  console.log('🔍 createBlogPost called with:', { title: data.title, status: data.status, dbClient });
  
  if (USE_TURSO) {
    const sql = `
      INSERT INTO BlogPost (
        id, slug, title, excerpt, content, featuredImage, publishedAt,
        readTime, featured, status, metaTitle, metaDescription, keywords,
        authorId, categoryId, createdAt, updatedAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    const id = `post_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const now = new Date().toISOString();
    
    const result = await turso.execute({
      sql,
      args: [
        id, data.slug, data.title, data.excerpt, data.content,
        data.featuredImage, data.publishedAt || now, data.readTime || 5,
        data.featured ? 1 : 0, data.status || 'PUBLISHED',
        data.metaTitle, data.metaDescription, JSON.stringify(data.keywords || []),
        data.authorId, data.categoryId, now, now
      ]
    });
    
    console.log('🔍 Turso createBlogPost result:', result);
    
    // Return post in expected format
    return {
      id,
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt,
      content: data.content,
      featuredImage: data.featuredImage,
      publishedAt: data.publishedAt || now,
      readTime: data.readTime || 5,
      featured: data.featured || false,
      status: data.status || 'PUBLISHED',
      author: {
        name: 'Dr. Hossein Mohammadi',
        avatar: '/images/team/hossein.jpg',
        title: 'AI Solutions Expert & CEO'
      },
      category: 'AI Solutions', // You might want to look this up from categoryId
      tags: data.keywords || [],
      seo: {
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        keywords: data.keywords || []
      }
    };
    
  } else {
    // For Prisma, handle tags if provided
    const createData: any = {
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      content: data.content,
      featuredImage: data.featuredImage,
      authorId: data.authorId,
      categoryId: data.categoryId,
      featured: data.featured,
      status: data.status,
      publishedAt: data.publishedAt ? new Date(data.publishedAt) : null,
      readTime: data.readTime,
      metaTitle: data.metaTitle,
      metaDescription: data.metaDescription,
      keywords: JSON.stringify(data.keywords || [])
    };

    // Handle tags if provided
    if (data.tagIds && data.tagIds.length > 0) {
      createData.tags = {
        create: data.tagIds.map((tagId: string) => ({
          tagId
        }))
      };
    }

    const result = await prisma.blogPost.create({ 
      data: createData,
      include: {
        author: {
          select: { name: true, avatar: true, title: true }
        },
        category: {
          select: { name: true, slug: true, color: true }
        },
        tags: {
          include: {
            tag: {
              select: { name: true, slug: true }
            }
          }
        }
      }
    });
    
    console.log('🔍 Prisma createBlogPost result:', result);
    
    // Transform to expected format
    return {
      id: result.id,
      slug: result.slug,
      title: result.title,
      excerpt: result.excerpt,
      content: result.content,
      featuredImage: result.featuredImage,
      publishedAt: result.publishedAt?.toISOString() || null,
      readTime: result.readTime,
      featured: result.featured,
      status: result.status,
      author: {
        name: result.author.name,
        avatar: result.author.avatar || '/images/team/hossein.jpg',
        title: result.author.title || 'Author'
      },
      category: result.category.name,
      tags: result.tags.map(t => t.tag.name),
      seo: {
        metaTitle: result.metaTitle,
        metaDescription: result.metaDescription,
        keywords: result.keywords ? JSON.parse(result.keywords) : []
      }
    };
  }
}

// Import PostStatus enum for proper typing
import { PostStatus } from '@prisma/client';

// Get total posts count for any status
export async function getBlogPostsCount(status?: PostStatus | string) {
  if (USE_TURSO) {
    let sql = 'SELECT COUNT(*) as count FROM BlogPost';
    const args: any[] = [];
    
    if (status) {
      sql += ' WHERE status = ?';
      args.push(status);
    }
    
    const result = await turso.execute({ sql, args });
    return Number(result.rows[0]?.count) || 0;
  } else {
    return await prisma.blogPost.count({
      where: status ? { status: status as PostStatus } : undefined
    });
  }
}