import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'SEO Services Dayton Ohio | Search Engine Optimization | AutoTech Venture',
  description: 'Professional SEO services in Dayton, Ohio. Improve your search rankings with expert SEO strategies by AutoTech Venture.',
  alternates: {
    canonical: 'https://www.atechv.com/seo-services-dayton',
  },
};

export default function SEOServicesPage() {
  return (
    <main>
      <Header />
      <section className="bg-gradient-to-br from-orange-50 to-blue-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              SEO Services in Dayton, Ohio
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Improve your search rankings with expert SEO strategies and optimization.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
