// app/api/blog/[slug]/route.ts - Updated with Production Support
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { transformPostFromDB } from '@/lib/types';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    // Check if we're in production and should use Turso
    const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL_ENV === 'production';
    
    if (isProduction) {
      // Use Turso directly in production
      return await handleTursoSinglePost(slug);
    } else {
      // Use existing Prisma logic for local development
      return await handlePrismaSinglePost(slug);
    }

  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}

// Production: Turso database query for single post
async function handleTursoSinglePost(slug: string) {
  try {
    // Import Turso client
    const { turso } = await import('@/lib/turso');
    
    const sql = `
      SELECT 
        bp.id, bp.slug, bp.title, bp.excerpt, bp.content, bp.featuredImage,
        bp.publishedAt, bp.createdAt, bp.updatedAt, bp.readTime, bp.featured, 
        bp.metaTitle, bp.metaDescription, bp.keywords, bp.status,
        u.name as authorName, u.avatar as authorAvatar, u.title as authorTitle,
        c.name as categoryName, c.slug as categorySlug, c.color as categoryColor
      FROM BlogPost bp
      JOIN User u ON bp.authorId = u.id
      JOIN Category c ON bp.categoryId = c.id
      WHERE (bp.slug = ? OR bp.id = ?) AND bp.status = 'PUBLISHED'
    `;

    const result = await turso.execute({ sql, args: [slug, slug] });

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    const row = result.rows[0];
    
    // Transform directly to BlogPostData format
    const post = {
      id: row.id as string,
      slug: row.slug as string,
      title: row.title as string,
      excerpt: row.excerpt as string,
      content: row.content as string,
      featuredImage: row.featuredImage as string || null,
      author: {
        name: row.authorName as string,
        avatar: row.authorAvatar as string || '/images/team/hossein.jpg',
        title: row.authorTitle as string
      },
      publishedAt: row.publishedAt as string,
      readTime: row.readTime as number || 5,
      tags: row.keywords ? JSON.parse(row.keywords as string) : [],
      category: row.categoryName as string,
      featured: Boolean(row.featured),
      seo: {
        metaTitle: row.metaTitle as string,
        metaDescription: row.metaDescription as string,
        keywords: row.keywords ? JSON.parse(row.keywords as string) : []
      }
    };

    return NextResponse.json(post);

  } catch (error) {
    console.error('Error with Turso single post query:', error);
    
    // Fallback to sample post if Turso fails
    return NextResponse.json(getSamplePostBySlug(slug));
  }
}

// Local Development: Existing Prisma logic
async function handlePrismaSinglePost(slug: string) {
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
          slug: true,
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
}

// Sample post fallback (for demo purposes)
function getSamplePostBySlug(slug: string) {
  const samplePosts = [
    {
      id: '1',
      slug: 'ai-automation-small-business-dayton',
      title: 'How AI Automation Transforms Small Businesses in Dayton',
      excerpt: 'Discover how local Dayton businesses are leveraging AI automation to streamline operations, reduce costs, and increase productivity in 2025.',
      content: `<h2>The AI Revolution in Dayton</h2>
<p>Small businesses in Dayton, Ohio are experiencing unprecedented growth through AI automation. From inventory management to customer service, artificial intelligence is transforming how local companies operate.</p>

<h3>Key Benefits for Dayton Businesses:</h3>
<ul>
<li>Automated customer service chatbots that respond 24/7</li>
<li>Intelligent inventory management that predicts demand</li>
<li>Predictive analytics for accurate sales forecasting</li>
<li>Automated social media management and content creation</li>
<li>Smart appointment scheduling systems</li>
</ul>

<p>At AutoTech Venture, we help Dayton businesses implement these cutting-edge solutions. Our AI automation services have helped local companies reduce operational costs by up to 40% while improving customer satisfaction.</p>

<h3>Success Stories from Dayton</h3>
<p>One of our clients, a local manufacturing company, implemented our AI quality control system and reduced defects by 60%. Another Dayton retailer used our inventory optimization AI to reduce stockouts by 75%.</p>

<p>Ready to transform your business with AI? Contact AutoTech Venture today for a free consultation and discover how artificial intelligence can revolutionize your operations.</p>`,
      featuredImage: '/images/blog/ai-automation.jpg',
      author: {
        name: 'Dr. Hossein Mohammadi',
        avatar: '/images/team/hossein.jpg',
        title: 'AI Solutions Expert'
      },
      publishedAt: new Date().toISOString(),
      readTime: 5,
      tags: ['AI', 'Automation', 'Small Business', 'Dayton'],
      category: 'AI Solutions',
      featured: true,
      seo: {
        metaTitle: 'AI Automation for Small Business Dayton Ohio | AutoTech Venture',
        metaDescription: 'Learn how AI automation helps Dayton small businesses improve efficiency and reduce costs. Expert AI consulting services in Ohio.',
        keywords: ['AI automation', 'small business Dayton', 'business automation Ohio']
      }
    },
    {
      id: '2',
      slug: 'seo-services-dayton-ohio-2025',
      title: 'Complete SEO Guide for Dayton Ohio Businesses in 2025',
      excerpt: 'Master local SEO strategies that help Dayton businesses rank higher in Google search results and attract more local customers.',
      content: `<h2>Local SEO Success in Dayton</h2>
<p>Ranking high in local search results is crucial for Dayton businesses. Our comprehensive SEO strategies help local companies dominate search results and attract more customers from the greater Dayton area.</p>

<h3>Our Proven Dayton SEO Services Include:</h3>
<ul>
<li>Google Business Profile optimization for maximum visibility</li>
<li>Local keyword research targeting Dayton-specific searches</li>
<li>Complete website technical SEO audits and fixes</li>
<li>Content marketing strategies that engage local audiences</li>
<li>Local citation building across Ohio directories</li>
<li>Online reputation management and review optimization</li>
</ul>

<h3>Why Dayton Businesses Choose AutoTech Venture for SEO</h3>
<p>We understand the local Dayton market and know exactly what it takes to rank well in Ohio. Our clients typically see a 200% increase in organic traffic within 6 months.</p>

<h3>Local SEO Results That Matter</h3>
<p>Our recent client, a Dayton accounting firm, went from page 3 to position #1 for "tax services Dayton Ohio" in just 4 months. A local restaurant we worked with increased their online orders by 150% through improved local search visibility.</p>

<p>Ready to dominate local search results? Contact AutoTech Venture for a free SEO audit and see how we can help your Dayton business attract more customers online.</p>`,
      featuredImage: '/images/blog/seo-services.jpg',
      author: {
        name: 'Dr. Hossein Mohammadi',
        avatar: '/images/team/hossein.jpg',
        title: 'SEO Specialist'
      },
      publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      readTime: 7,
      tags: ['SEO', 'Local SEO', 'Dayton Ohio', 'Digital Marketing'],
      category: 'SEO Services',
      featured: false,
      seo: {
        metaTitle: 'SEO Services Dayton Ohio | Local Search Optimization | AutoTech Venture',
        metaDescription: 'Professional SEO services for Dayton businesses. Improve local search rankings and attract more customers with our proven strategies.',
        keywords: ['SEO services Dayton', 'local SEO Ohio', 'Dayton digital marketing']
      }
    }
  ];

  // Find post by slug
  const post = samplePosts.find(p => p.slug === slug);
  
  if (!post) {
    return { error: 'Post not found' };
  }

  return post;
}

// PATCH route for updating posts (keep your existing logic - only works in development)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    // Only allow updates in development
    const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL_ENV === 'production';
    
    if (isProduction) {
      return NextResponse.json(
        { error: 'Updates not allowed in production' },
        { status: 403 }
      );
    }

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
            slug: true,
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