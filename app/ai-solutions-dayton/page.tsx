import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'AI Solutions Dayton Ohio | Custom AI Services | AutoTech Venture',
  description: 'Professional AI solutions and services in Dayton, Ohio. Custom AI development, machine learning, and business automation by PhD experts.',
  alternates: {
    canonical: 'https://www.atechv.com/ai-solutions-dayton',
  },
};

export default function AISolutionsPage() {
  return (
    <main>
      <Header />
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              AI Solutions in Dayton, Ohio
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transform your business with custom AI solutions developed by PhD computer scientists.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
