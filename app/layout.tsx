import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { organizationSchema, websiteSchema } from '@/lib/schema';
import GoogleAnalytics from '@/components/GoogleAnalytics';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#1e3a8a',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.autotech-venture.com'),
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
    url: 'https://www.autotech-venture.com',
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
    canonical: 'https://www.autotech-venture.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en">
      <head>
        {/* Google Analytics Scripts - Only load if GA_ID is available */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  page_title: document.title,
                  page_location: window.location.href,
                });
              `}
            </Script>
          </>
        )}
        
        {/* Schema Markup */}
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
        {/* Google Analytics Component for client-side tracking */}
        {GA_ID && <GoogleAnalytics />}
        {children}
      </body>
    </html>
  );
}