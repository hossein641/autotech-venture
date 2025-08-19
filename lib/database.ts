// lib/database.ts - CLEAN VERSION without syntax errors
import { PrismaClient } from '@prisma/client';
import { createClient } from '@libsql/client';

// Initialize Prisma client
const prisma = new PrismaClient();

// Environment variables
const DATABASE_URL = process.env.DATABASE_URL;
const TURSO_AUTH_TOKEN = process.env.TURSO_AUTH_TOKEN;

// Determine which database to use
const USE_TURSO = DATABASE_URL?.includes('turso.io') && TURSO_AUTH_TOKEN;

let turso: any = null;
if (USE_TURSO) {
  turso = createClient({
    url: DATABASE_URL!,
    authToken: TURSO_AUTH_TOKEN
  });
}

console.log(`🔧 Database client: ${USE_TURSO ? 'Turso' : 'SQLite'}`);

// Get blog posts with proper status filtering
export async function getBlogPosts(filters: any = {}) {
  console.log('🔍 getBlogPosts called with filters:', filters);
  
  if (USE_TURSO) {
    return await getBlogPostsTurso(filters);
  } else {
    return await getBlogPostsPrisma(filters);
  }
}

// Prisma implementation with status handling
async function getBlogPostsPrisma(filters: any) {
  const {
    page = 1,
    limit = 10,
    search,
    category,
    tags,
    status,
    featured,
    author
  } = filters;

  const skip = (page - 1) * limit;

  // Build where clause with proper status filtering
  const where: any = {};

  // Status filtering logic
  if (status) {
    where.status = status;
    console.log(`🔍 Filtering by status: ${status}`);
  } else {
    // Default to published posts for public API calls
    where.status = 'PUBLISHED';
    console.log('🔍 No status filter provided, defaulting to PUBLISHED');
  }

  if (search) {
    where.OR = [
      { title: { contains: search } },
      { excerpt: { contains: search } },
      { content: { contains: search } }
    ];
  }

  if (category) {
    where.category = { slug: category };
  }

  if (tags && Array.isArray(tags)) {
    where.tags = {
      some: {
        tag: {
          slug: { in: tags }
        }
      }
    };
  }

  if (featured !== undefined) {
    where.featured = featured;
  }

  if (author) {
    where.author = { email: author };
  }

  console.log('🔍 Prisma where clause:', where);

  // Execute query with explicit status selection
  const [posts, total] = await Promise.all([
    prisma.blogPost.findMany({
      where,
      include: {
        author: { select: { name: true, avatar: true, title: true } },
        category: { select: { name: true, slug: true, color: true } },
        tags: { include: { tag: { select: { name: true, slug: true } } } }
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit
    }),
    prisma.blogPost.count({ where })
  ]);

  console.log(`✅ Prisma query returned ${posts.length} posts`);

  // Transform posts with explicit status inclusion
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
    status: post.status, // Explicitly include status
    author: {
      name: post.author.name,
      avatar: post.author.avatar || '/images/team/hossein.jpg',
      title: post.author.title || 'Author'
    },
    category: post.category.name,
    tags: post.tags.map((t: any) => t.tag.name),
    seo: {
      metaTitle: post.metaTitle,
      metaDescription: post.metaDescription,
      keywords: post.keywords ? JSON.parse(post.keywords) : []
    }
  }));

  console.log('🔍 First transformed post status:', transformedPosts[0]?.status);
  return { posts: transformedPosts, total };
}

// Turso implementation with status handling
async function getBlogPostsTurso(filters: any) {
  const {
    page = 1,
    limit = 10,
    search,
    category,
    tags,
    status,
    featured,
    author
  } = filters;

  const offset = (page - 1) * limit;
  let sql = `
    SELECT 
      bp.*,
      u.name as authorName,
      u.avatar as authorAvatar,
      u.title as authorTitle,
      c.name as categoryName,
      c.slug as categorySlug,
      c.color as categoryColor
    FROM BlogPost bp
    LEFT JOIN User u ON bp.authorId = u.id
    LEFT JOIN Category c ON bp.categoryId = c.id
    WHERE 1=1
  `;
  
  const args: any[] = [];

  // Status filtering for Turso
  if (status) {
    sql += ' AND bp.status = ?';
    args.push(status);
    console.log(`🔍 Turso filtering by status: ${status}`);
  } else {
    // Default to published posts
    sql += ' AND bp.status = ?';
    args.push('PUBLISHED');
    console.log('🔍 Turso defaulting to PUBLISHED status');
  }

  if (search) {
    sql += ' AND (bp.title LIKE ? OR bp.excerpt LIKE ? OR bp.content LIKE ?)';
    const searchTerm = `%${search}%`;
    args.push(searchTerm, searchTerm, searchTerm);
  }

  if (category) {
    sql += ' AND c.slug = ?';
    args.push(category);
  }

  if (featured !== undefined) {
    sql += ' AND bp.featured = ?';
    args.push(featured ? 1 : 0);
  }

  sql += ' ORDER BY bp.createdAt DESC LIMIT ? OFFSET ?';
  args.push(limit, offset);

  console.log('🔍 Turso SQL:', sql);
  console.log('🔍 Turso args:', args);

  const result = await turso.execute({ sql, args });
  console.log(`✅ Turso query returned ${result.rows.length} posts`);

  // Count total
  let countSql = 'SELECT COUNT(*) as count FROM BlogPost bp LEFT JOIN Category c ON bp.categoryId = c.id WHERE 1=1';
  const countArgs: any[] = [];

  if (status) {
    countSql += ' AND bp.status = ?';
    countArgs.push(status);
  } else {
    countSql += ' AND bp.status = ?';
    countArgs.push('PUBLISHED');
  }

  if (search) {
    countSql += ' AND (bp.title LIKE ? OR bp.excerpt LIKE ? OR bp.content LIKE ?)';
    const searchTerm = `%${search}%`;
    countArgs.push(searchTerm, searchTerm, searchTerm);
  }

  if (category) {
    countSql += ' AND c.slug = ?';
    countArgs.push(category);
  }

  if (featured !== undefined) {
    countSql += ' AND bp.featured = ?';
    countArgs.push(featured ? 1 : 0);
  }

  const countResult = await turso.execute({ sql: countSql, args: countArgs });
  const total = Number(countResult.rows[0]?.count) || 0;

  // Transform Turso results with explicit status
  const posts = result.rows.map((row: any) => ({
    id: String(row.id),
    slug: String(row.slug),
    title: String(row.title),
    excerpt: String(row.excerpt),
    content: String(row.content),
    featuredImage: row.featuredImage ? String(row.featuredImage) : null,
    publishedAt: row.publishedAt ? new Date(String(row.publishedAt)).toISOString() : null,
    updatedAt: row.updatedAt ? new Date(String(row.updatedAt)).toISOString() : null,
    readTime: Number(row.readTime) || 5,
    featured: Boolean(row.featured),
    status: String(row.status), // Explicitly include status from database
    author: {
      name: String(row.authorName),
      avatar: row.authorAvatar ? String(row.authorAvatar) : '/images/team/hossein.jpg',
      title: row.authorTitle ? String(row.authorTitle) : 'Author'
    },
    category: String(row.categoryName),
    tags: [], // Tags require separate query in Turso
    seo: {
      metaTitle: row.metaTitle ? String(row.metaTitle) : null,
      metaDescription: row.metaDescription ? String(row.metaDescription) : null,
      keywords: row.keywords ? JSON.parse(String(row.keywords)) : []
    }
  }));

  console.log('🔍 First Turso transformed post status:', posts[0]?.status);
  return { posts, total };
}

// Create blog post with explicit status handling
export async function createBlogPost(data: any) {
  console.log('🔍 createBlogPost called with:', { 
    title: data.title, 
    status: data.status,
    database: USE_TURSO ? 'Turso' : 'Prisma'
  });

  // Ensure status is always set
  const postData = {
    ...data,
    status: data.status || 'DRAFT' // Default to DRAFT if not specified
  };

  if (USE_TURSO) {
    return await createBlogPostTurso(postData);
  } else {
    return await createBlogPostPrisma(postData);
  }
}

// Prisma create with explicit status
async function createBlogPostPrisma(data: any) {
  const createData = {
    slug: data.slug,
    title: data.title,
    excerpt: data.excerpt,
    content: data.content,
    featuredImage: data.featuredImage,
    authorId: data.authorId,
    categoryId: data.categoryId,
    featured: data.featured || false,
    status: data.status || 'DRAFT', // Explicit status
    publishedAt: data.publishedAt ? new Date(data.publishedAt) : null,
    readTime: data.readTime,
    metaTitle: data.metaTitle,
    metaDescription: data.metaDescription,
    keywords: JSON.stringify(data.keywords || [])
  };

  console.log('🔍 Prisma create data:', {
    title: createData.title,
    status: createData.status,
    featured: createData.featured
  });

  const result = await prisma.blogPost.create({ 
    data: createData,
    include: {
      author: { select: { name: true, avatar: true, title: true } },
      category: { select: { name: true, slug: true, color: true } },
      tags: { include: { tag: { select: { name: true, slug: true } } } }
    }
  });

  console.log('✅ Prisma created post with status:', result.status);

  // Return with explicit status
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
    status: result.status, // Include status in response
    author: {
      name: result.author.name,
      avatar: result.author.avatar || '/images/team/hossein.jpg',
      title: result.author.title || 'Author'
    },
    category: result.category.name,
    tags: result.tags.map((t: any) => t.tag.name),
    seo: {
      metaTitle: result.metaTitle,
      metaDescription: result.metaDescription,
      keywords: result.keywords ? JSON.parse(result.keywords) : []
    }
  };
}

// Turso create with explicit status
// Update the createBlogPostTurso function in lib/database.ts

async function createBlogPostTurso(data: any) {
  const id = `post_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const now = new Date().toISOString();
  
  const sql = `
    INSERT INTO BlogPost (
      id, slug, title, excerpt, content, featuredImage, publishedAt,
      readTime, featured, status, metaTitle, metaDescription, keywords,
      authorId, categoryId, createdAt, updatedAt
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const status = data.status || 'DRAFT';
  
  console.log('🔍 Turso creating post with data types:', {
    title: typeof data.title,
    featured: typeof data.featured,
    readTime: typeof data.readTime,
    status: typeof status
  });

  // FIX: Ensure proper types for Turso/SQLite
  const args = [
    id,                                           // TEXT
    data.slug,                                    // TEXT  
    data.title,                                   // TEXT
    data.excerpt,                                 // TEXT
    data.content,                                 // TEXT
    data.featuredImage || null,                   // TEXT or NULL
    data.publishedAt || now,                      // TEXT (ISO string)
    Number(data.readTime) || 5,                   // INTEGER
    data.featured ? 1 : 0,                        // INTEGER (SQLite boolean)
    status,                                       // TEXT
    data.metaTitle || null,                       // TEXT or NULL
    data.metaDescription || null,                 // TEXT or NULL
    JSON.stringify(data.keywords || []),          // TEXT (JSON string)
    data.authorId,                               // TEXT
    data.categoryId,                             // TEXT
    now,                                         // TEXT (ISO string)
    now                                          // TEXT (ISO string)
  ];

  console.log('🔍 Turso SQL args with types:', args.map((arg, i) => ({
    index: i,
    value: arg,
    type: typeof arg
  })));

  try {
    await turso.execute({ sql, args });
    console.log('✅ Turso created post successfully');

    // Return the created post with explicit status
    return {
      id,
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt,
      content: data.content,
      featuredImage: data.featuredImage,
      publishedAt: data.publishedAt || now,
      readTime: Number(data.readTime) || 5,
      featured: Boolean(data.featured),
      status: status,
      author: {
        name: 'Dr. Hossein Mohammadi', // Should fetch from database
        avatar: '/images/team/hossein.jpg',
        title: 'AI Solutions Expert & CEO'
      },
      category: 'AI Solutions', // Should fetch from database
      tags: [],
      seo: {
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        keywords: data.keywords || []
      }
    };
  } catch (error) {
    console.error('❌ Turso insert error:', error);
    console.error('❌ Failed SQL:', sql);
    console.error('❌ Failed args:', args);
    throw error;
  }
}

// Get individual blog post by slug
export async function getBlogPostBySlug(slug: string) {
  console.log('🔍 getBlogPostBySlug called with slug:', slug);
  
  if (USE_TURSO) {
    const sql = `
      SELECT 
        bp.*,
        u.name as authorName,
        u.avatar as authorAvatar,
        u.title as authorTitle,
        c.name as categoryName,
        c.slug as categorySlug,
        c.color as categoryColor
      FROM BlogPost bp
      LEFT JOIN User u ON bp.authorId = u.id
      LEFT JOIN Category c ON bp.categoryId = c.id
      WHERE (bp.slug = ? OR bp.id = ?) 
      LIMIT 1
    `;
    
    const result = await turso.execute({ sql, args: [slug, slug] });
    
    if (result.rows.length === 0) return null;
    
    const row = result.rows[0];
    
    return {
      id: String(row.id),
      slug: String(row.slug),
      title: String(row.title),
      excerpt: String(row.excerpt),
      content: String(row.content),
      featuredImage: row.featuredImage ? String(row.featuredImage) : null,
      publishedAt: row.publishedAt ? new Date(String(row.publishedAt)).toISOString() : null,
      updatedAt: row.updatedAt ? new Date(String(row.updatedAt)).toISOString() : null,
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
    };
  }
}