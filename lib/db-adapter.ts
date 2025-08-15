import { prisma } from '@/lib/prisma';
import { turso } from '@/lib/turso';

// Environment-based database switching
const USE_TURSO = process.env.NODE_ENV === 'production' || process.env.USE_TURSO === 'true';

export async function getBlogPosts(filters: any, pagination: any) {
  if (USE_TURSO) {
    return getTursoBlogPosts(filters, pagination);
  } else {
    return getPrismaBlogPosts(filters, pagination);
  }
}

export async function getBlogPostBySlug(slug: string) {
  if (USE_TURSO) {
    return getTursoBlogPostBySlug(slug);
  } else {
    return getPrismaBlogPostBySlug(slug);
  }
}

// Your existing Prisma logic (slightly modified)
async function getPrismaBlogPosts(filters: any, pagination: any) {
  const where: any = {};

  if (!filters.status) {
    where.status = 'PUBLISHED';
  } else {
    where.status = filters.status;
  }

  if (filters.search) {
    where.OR = [
      { title: { contains: filters.search } }, // ✅ Removed mode: 'insensitive'
      { excerpt: { contains: filters.search } },
      { content: { contains: filters.search } },
    ];
  }

  if (filters.category) {
    where.category = { slug: filters.category };
  }

  if (filters.tag) {
    where.tags = {
      some: { tag: { slug: filters.tag } }
    };
  }

  if (filters.featured !== undefined) {
    where.featured = filters.featured;
  }

  if (filters.authorId) {
    where.authorId = filters.authorId;
  }

  const skip = (pagination.page - 1) * pagination.limit;
  const orderBy: any = {};
  
  if (pagination.sortBy === 'publishedAt') {
    orderBy.publishedAt = pagination.sortOrder;
  } else if (pagination.sortBy === 'createdAt') {
    orderBy.createdAt = pagination.sortOrder;
  } else if (pagination.sortBy === 'updatedAt') {
    orderBy.updatedAt = pagination.sortOrder;
  } else {
    orderBy.title = pagination.sortOrder;
  }

  const [posts, totalCount] = await Promise.all([
    prisma.blogPost.findMany({
      where,
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
      },
      orderBy,
      skip,
      take: pagination.limit,
    }),
    prisma.blogPost.count({ where })
  ]);

  return { posts, totalCount };
}

async function getPrismaBlogPostBySlug(slug: string) {
  return await prisma.blogPost.findFirst({
    where: {
      OR: [
        { slug: slug },
        { id: slug }
      ],
      status: 'PUBLISHED'
    },
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
}

// Turso implementations
async function getTursoBlogPosts(filters: any, pagination: any) {
  let sql = `
    SELECT 
      bp.id, bp.slug, bp.title, bp.excerpt, bp.content, bp.featuredImage,
      bp.publishedAt, bp.readTime, bp.featured, bp.metaTitle, bp.metaDescription, bp.keywords,
      u.name as authorName, u.avatar as authorAvatar, u.title as authorTitle,
      c.name as categoryName, c.slug as categorySlug, c.color as categoryColor
    FROM BlogPost bp
    JOIN User u ON bp.authorId = u.id
    JOIN Category c ON bp.categoryId = c.id
    WHERE bp.status = 'PUBLISHED'
  `;

  const args: any[] = [];
  
  if (filters.category) {
    sql += ' AND c.slug = ?';
    args.push(filters.category);
  }
  
  if (filters.featured === true) {
    sql += ' AND bp.featured = 1';
  }

  if (filters.search) {
    sql += ` AND (bp.title LIKE ? OR bp.excerpt LIKE ? OR bp.content LIKE ?)`;
    const searchTerm = `%${filters.search}%`;
    args.push(searchTerm, searchTerm, searchTerm);
  }

  sql += ' ORDER BY bp.publishedAt DESC LIMIT ? OFFSET ?';
  args.push(pagination.limit, (pagination.page - 1) * pagination.limit);

  const result = await turso.execute({ sql, args });

  // Transform to match Prisma format
  const posts = result.rows.map(row => ({
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    featuredImage: row.featuredImage,
    publishedAt: row.publishedAt,
    readTime: row.readTime || 5,
    featured: Boolean(row.featured),
    metaTitle: row.metaTitle,
    metaDescription: row.metaDescription,
    keywords: row.keywords,
    author: {
      name: row.authorName,
      avatar: row.authorAvatar || '/images/team/hossein.jpg',
      title: row.authorTitle
    },
    category: {
      name: row.categoryName,
      slug: row.categorySlug,
      color: row.categoryColor
    },
    tags: [] // We can implement this later if needed
  }));

  // Get total count
  const countResult = await turso.execute({
    sql: `SELECT COUNT(*) as total FROM BlogPost WHERE status = 'PUBLISHED'`,
    args: []
  });
  const totalCount = countResult.rows[0]?.total as number || 0;

  return { posts, totalCount };
}

async function getTursoBlogPostBySlug(slug: string) {
  const sql = `
    SELECT 
      bp.id, bp.slug, bp.title, bp.excerpt, bp.content, bp.featuredImage,
      bp.publishedAt, bp.readTime, bp.featured, bp.metaTitle, bp.metaDescription, bp.keywords,
      u.name as authorName, u.avatar as authorAvatar, u.title as authorTitle,
      c.name as categoryName, c.slug as categorySlug, c.color as categoryColor
    FROM BlogPost bp
    JOIN User u ON bp.authorId = u.id
    JOIN Category c ON bp.categoryId = c.id
    WHERE (bp.slug = ? OR bp.id = ?) AND bp.status = 'PUBLISHED'
  `;

  const result = await turso.execute({ sql, args: [slug, slug] });

  if (result.rows.length === 0) {
    return null;
  }

  const row = result.rows[0];
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    featuredImage: row.featuredImage,
    publishedAt: row.publishedAt,
    readTime: row.readTime || 5,
    featured: Boolean(row.featured),
    metaTitle: row.metaTitle,
    metaDescription: row.metaDescription,
    keywords: row.keywords,
    author: {
      name: row.authorName,
      avatar: row.authorAvatar || '/images/team/hossein.jpg',
      title: row.authorTitle
    },
    category: {
      name: row.categoryName,
      slug: row.categorySlug,
      color: row.categoryColor
    },
    tags: [] // We can implement this later if needed
  };
}