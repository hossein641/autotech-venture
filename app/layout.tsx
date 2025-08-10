import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { organizationSchema, websiteSchema } from '@/lib/schema';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#1e3a8a',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.atechv.com'),
  title: {
    default: 'AutoTech Venture | AI Solutions & Automation Services | Dayton Ohio',
    template: '%s | AutoTech Venture'
  },
  description: 'AutoTech Venture provides AI-powered automation solutions, web design, and SEO services for small businesses in Dayton, Ohio. PhD-led team with proven results.',
  keywords: [
    'AI solutions Dayton Ohio',
    'AI services Dayton OH', 
    'AI consultant Dayton',
    'business automation Dayton',
    'small business automation Dayton',
    'workflow automation Ohio',
    'process automation Dayton OH',
    'website designer Dayton Ohio',
    'web design Dayton OH',
    'SEO services Dayton Ohio',
    'digital marketing Dayton Ohio'
  ],
  authors: [{ name: 'AutoTech Venture' }],
  creator: 'AutoTech Venture',
  publisher: 'AutoTech Venture',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.atechv.com',
    siteName: 'AutoTech Venture',
    title: 'AutoTech Venture | AI Solutions & Automation Services | Dayton Ohio',
    description: 'PhD-led AI and automation solutions for small businesses in Dayton, Ohio. Transform your business with cutting-edge technology.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AutoTech Venture - AI Solutions in Dayton Ohio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AutoTech Venture | AI Solutions & Automation Services | Dayton Ohio',
    description: 'PhD-led AI and automation solutions for small businesses in Dayton, Ohio.',
    images: ['/twitter-image.jpg'],
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://www.atechv.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
