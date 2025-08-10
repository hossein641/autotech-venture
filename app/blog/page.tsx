import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Blog | AI & Tech Insights | AutoTech Venture',
  description: 'Latest insights on AI, automation, and technology trends from the AutoTech Venture team in Dayton, Ohio.',
  alternates: {
    canonical: 'https://www.atechv.com/blog',
  },
};

export default function BlogPage() {
  return (
    <main>
      <Header />
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Latest Insights
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay updated with the latest trends in AI, automation, and technology.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
