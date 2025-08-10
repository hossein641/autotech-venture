import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Web Design Dayton Ohio | Professional Website Design | AutoTech Venture',
  description: 'Professional web design services in Dayton, Ohio. Custom websites, responsive design, and modern web solutions by AutoTech Venture.',
  alternates: {
    canonical: 'https://www.atechv.com/web-design-dayton',
  },
};

export default function WebDesignPage() {
  return (
    <main>
      <Header />
      <section className="bg-gradient-to-br from-purple-50 to-blue-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Web Design in Dayton, Ohio
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional web design and development services for Ohio businesses.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
