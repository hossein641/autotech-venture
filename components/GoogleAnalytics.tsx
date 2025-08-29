'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export default function GoogleAnalytics() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_ID!, {
        page_title: document.title,
        page_location: window.location.href,
      });
    }
  }, []);

  return null;
}